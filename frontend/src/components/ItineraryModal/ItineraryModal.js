import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './ItineraryModal.css'
import { createItinerary, editItinerary } from '../../store/itineraries';

import SearchUserInput from '../SearchUsersInput/SearchUsersInput';
import Collaborator from "./Collaborator";
import InputField from '../InputField/InputField';

export default function ItineraryModal({ itinerary, closeModal }) {
    const dispatch = useDispatch();
    const [openDate, setOpenDate] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState('Create');
    const [cover, setCover] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);
    const [collaboratorsIds, setCollaboratorsIds] = useState([]);

    useEffect(()=> {
        if (itinerary) {
            setType('Edit');
            setTitle(itinerary.title);
            setDescription(itinerary.description);
            setDates([{
                startDate: new Date(itinerary.dateStart), 
                endDate: new Date(itinerary.dateEnd), 
                key: 'selection'
            }]);
            setCoverUrl(itinerary.coverImageUrl);
            setCollaboratorsIds(itinerary.collaborators);
        }
    }, [])

    const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    const dateConvert = (date) => {
        let [m, d, y] = date.split('/')
        if (m.length <2) {
          m = "0" + m
        }
        if (d.length < 2) {
          d = "0" + d
        }
        return [y ,m ,d].join("-")
      }    

    const toggleOpenDate = () => {
        setOpenDate(!openDate)
    }

    const addCollaborator = (userId) => {
        if (!collaboratorsIds.includes(userId)) {
            setCollaboratorsIds((ids) => [ ...ids, userId ]);
        }
    }

    const removeCollaborator = (userId) => {
        setCollaboratorsIds((ids) => ids.filter((id) => id !== userId));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === "Create") {
            await dispatch(createItinerary({
                title: title, 
                description: description, 
                dateStart: dates[0].startDate, 
                dateEnd: dates[0].endDate,
                collaborators: collaboratorsIds,
                cover
            }))
        } else {
            await dispatch(editItinerary({
                id: itinerary._id, 
                title: title, 
                description: description, 
                dateStart: dates[0].startDate, 
                dateEnd: dates[0].endDate,
                collaborators: collaboratorsIds,
                cover
            }))
        }
        closeModal();
    }

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setCover(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => 
                setCoverUrl(fileReader.result);
        } else {
            setCoverUrl(null);
        }
    };
    
      let preview = null;
      if (coverUrl) {
          preview = <img src={coverUrl}/>;
      }

    return(
        <>
            <h2 className="itinerary-form-title">
                {
                    type === 'Edit' ? 'Edit Itinerary' : 'New Itinerary'
                }
            </h2>
            <form className="itinerary-form" onSubmit={handleSubmit}>
                <div className="it-photo-container">
                    <div className="it-file-upload-container">
                        <label className="file-upload">
                            {
                                preview ? (
                                    <div className='it-photo-preview'>{preview}</div>
                                ) : (
                                    <div className="it-upload-file-icon-wrapper">
                                        <i className="fa-solid fa-image fa-2xl image-icon" />
                                    </div>
                                )
                            }
                            <input type="file" 
                            accept=".jpg, .jpeg, .png" 
                            onChange={handleFile}
                            />
                        </label>
                        Upload itinerary cover image
                    </div>
                </div>
                
                <div id="inputs">
                    <InputField
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                        placeholder="Title"
                    />
                
                    <InputField
                        textarea
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                        placeholder="Description"
                    />

                    <p className="section-title">
                        Dates
                    </p>
                    
                    <div id="dates" onClick={toggleOpenDate}>
                        <InputField
                            value={dateConvert(dates[0].startDate.toLocaleDateString())}
                        />

                        <i className="fa-solid fa-plane" style={{color: "#F87575",}}/>

                        <InputField
                            value={dateConvert(dates[0].endDate.toLocaleDateString())}
                        />
                    </div>
                    
                    {openDate && 
                        <div id="calendar">
                            <div id="calendarDone" onClick={toggleOpenDate}>Close</div>
                            <DateRange months={2} direction="horizontal" color="#D33756" minDate={new Date()} editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates}/> 
                        </div>
                    }

                    <p className="section-title">
                        Collaborators
                    </p>
                    
                    <div className="collaborators">
                        <SearchUserInput
                            onChange={addCollaborator}
                        />
                        {
                            collaboratorsIds.map((userId) => (
                                <Collaborator
                                    key={userId}
                                    userId={userId}
                                    onRemove={removeCollaborator}
                                />
                            ))
                        }
                    </div>
                    
                    <input
                        type="submit"
                        value={
                            type === 'Edit' ? 'Update' : 'Create'
                        }
                    />
                </div>
            </form>
        </>
    )
}