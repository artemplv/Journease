import { useState } from "react";
import { useDispatch } from "react-redux";
import { createActivity } from "../../store/activities";
import SearchPlacesInput from "../SearchPlacesInput/SearchPlacesInput";
import './ActivityModal.css'

import InputField from '../InputField/InputField';

const ActivityModal = ({itineraryId, date, closeModal}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState(null);
    const [description, setDescription] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createActivity(itineraryId, {
            title,
            description,
            date,
            place
        }));
        closeModal();
    }

    return (
            <form className="activity-modal-container" onSubmit={handleSubmit}>
                {place && 
                <div className="activity-preview-header">
                    <div className="activity-header">
                        <h2>{place.name}</h2>
                    </div>
                    <div className="activity-preview-image">
                        <img src={place.photo}/>
                    </div>
                </div>
                }
                <div className="activity-details">
                    <h1>Add an activity</h1>

                    <InputField
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                        placeholder="Title"
                    />

                    <InputField
                        value=""
                        placeholder={date}
                        disabled
                    />
                    
                    <SearchPlacesInput onChange={setPlace}/>

                    <InputField
                        textarea
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                        placeholder="Description"
                    />
                    
                    <input type="submit" value="Submit"/>
                </div>
            </form>
    )
}

export default ActivityModal;