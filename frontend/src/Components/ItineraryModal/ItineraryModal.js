import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './ItineraryModal.css'
import { createItinerary, editItinerary } from "../../store/itineraries";

import SearchUserInput from "../SearchUsersInput/SearchUsersInput";

export default function ItineraryModal({itinerary}) {
    const dispatch = useDispatch();
    const [openDate, setOpenDate] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const owner = useSelector(state => state.session.user);
    const [type, setType] = useState('Create');
    const [cover, setCover] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "Create") {
            dispatch(createItinerary({
                // owner: owner.username, 
                // ownerId: owner._id, 
                title: title, 
                description: description, 
                dateStart: dates[0].startDate, 
                dateEnd: dates[0].endDate,
                cover
            }))
        } else {
            dispatch(editItinerary({
                // owner: owner.username, 
                id: itinerary._id, 
                // ownerId: owner._id, 
                title: title, 
                description: description, 
                dateStart: dates[0].startDate, 
                dateEnd: dates[0].endDate,
                cover
            }))
        }
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
        <form className="itinerary-form" onSubmit={handleSubmit}>
            <div className="it-photo-container">
            <div className='label'>Image Upload</div>
                <div className='it-photo-preview'>{preview}</div>
                <input type="file" 
                    accept=".jpg, .jpeg, .png" 
                    onChange={handleFile} />
            </div>
            <div id="inputs">
                <div>Title</div>
                    <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                <div>Description</div>
                    <textarea value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                <div id="dates" onClick={toggleOpenDate}>Dates
                    <br/>
                    <input type="text" value={dateConvert(dates[0].startDate.toLocaleDateString())}/>
                    <label> → 
                        <input type="text" value={dateConvert(dates[0].endDate.toLocaleDateString())}/>
                    </label>
                </div>
                {openDate && 
                    <div id="calendar">
                        <div id="calendarDone" onClick={toggleOpenDate}>Close</div>
                        <DateRange months={2} direction="horizontal" color="#D33756" minDate={new Date()} editableDateInputs={true} onChange={item => setDates([item.selection])} moveRangeOnFirstSelection={false} ranges={dates}/> 
                    </div>
                }
                <div>Collaborators
                    <br/>
                    <SearchUserInput />
                </div>
                <input type="submit" value="Create"/>
            </div>
        </form>
    )
}