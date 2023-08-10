import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, updateActivity } from "../../store/activities";
import SearchPlacesInput from "../SearchPlacesInput/SearchPlacesInput";
import './ActivityModal.css'

const ActivityModal = ({itineraryId, date, activityId}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState(null);
    const [description, setDescription] = useState("");
    const activity = useSelector(state => state.activities[activityId])

    useEffect(()=> {
        if (activity) {
            setTitle(activity.title);
            setPlace(activity.place);
            setDescription(activity.description)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activity) {
            dispatch(updateActivity(itineraryId, {_id: activity._id, title, description, date, place}))
        } else {
            dispatch(createActivity(itineraryId, {
                title,
                description,
                date,
                place
            }))
        }
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
                            value={title}
                            onChange={((e) => {setTitle(e.target.value)})}/>
                    </label>
                    <label>Date<br></br>
                        <input placeholder={new Date(date).toDateString().slice(4)} disabled/>
                    </label>
                    <label>Place<br></br>
                        <SearchPlacesInput onChange={setPlace} value={place} activity={activity}/>
                    </label>
                    <label>Description<br></br>
                      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
    )
}

export default ActivityModal;