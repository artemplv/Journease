import { useState } from "react";
import { useDispatch } from "react-redux";
import { createActivity } from "../../store/activities";
import SearchPlacesInput from "../SearchPlacesInput/SearchPlacesInput";
import './ActivityModal.css'


const ActivityModal = ({itineraryId}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createActivity(itineraryId, {
            title,
            //pass date in as a prop, remove next line 
            date: null,
            place
        }))
    }

    return (
        <form className="activity-modal-container">
            {place && 
            <div className="activity-preview-header">
                <div className="activity-header">
                    <h1>{place.name}</h1>
                </div>
                <div className="activity-preview-image">
                    <img src={place.photo}/>
                </div>
            </div>
            }
            <div className="activity-details">
                <div className="activity-form-title">Add an activity</div>
                <label>Title<br></br>
                    <input 
                        type="text"
                        className="activity-title"
                        onChange={((e) => {setTitle(e.target.value)})}/>
                </label>
                <label>Date<br></br>
                    <input placeholder="chosen date" disabled/>
                </label>
                <label>Place<br></br>
                    <SearchPlacesInput onChange={setPlace}/>
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}

export default ActivityModal;