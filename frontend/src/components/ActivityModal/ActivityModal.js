import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, fetchActivity, updateActivity } from "../../store/activities";
import SearchPlacesInput from "../SearchPlacesInput/SearchPlacesInput";
import './ActivityModal.css'

import InputField from '../InputField/InputField';

const ActivityModal = ({itineraryId, date, activityId, closeModal}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState(null);
    const [description, setDescription] = useState("");
    const activity = useSelector(state => state.activities[activityId])
    const dateString = new Date(date).toDateString().slice(4) 
    
    useEffect(()=> {
        if (activity) {
            setTitle(activity.title)
            setPlace(activity.place)
            setDescription(activity.description)
        }
    }, [activity])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activity) {
            await dispatch(updateActivity(itineraryId, {
                _id: activity._id,
                title,
                description,
                date,
                place
            }))
        } else {
            await dispatch(createActivity(itineraryId, {
                title,
                description,
                date,
                place
            }));
        }
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
                        placeholder={dateString}
                        disabled
                    />
                    
                    <SearchPlacesInput onChange={setPlace} placeholder={activity?.place.name}/>

                    <InputField
                        textarea
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                        placeholder="Description"
                    />
                    
                    { title === '' || place === null ?
                        <input type="submit" value="Submit" disabled="disabled"/>
                        :
                        <input type="submit" value="Submit"/> 

                    }
                </div>
            </form>
    )
}

export default ActivityModal;
