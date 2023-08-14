import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteActivity } from '../../store/activities';
import ActivityModal from '../ActivityModal/ActivityModal';
import './ActivityIndex.css'
import { Modal } from '../../context/Modal';

import useGooglePlaceImage from '../../hooks/useGooglePlaceImage';

export default function ActivityItem({activity, ownerId, itinerary}) {
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false)
    const currentUserId = useSelector(state => state.session.user?._id)

    const imageSrc = useGooglePlaceImage(activity.place.placeId);

    const remove = () => {
        dispatch(deleteActivity(activity._id))
    }

    const edit = () => {
        setOpenEdit(true)
    }

    return (
        <>
            <div className="activity-item">
                <div id="activity-item-img">
                    <img
                        src={imageSrc}
                        alt=""
                    />
                </div>
                <div id="activity-item-header">
                    <h2 id="activity-item-heading">{activity.title}</h2>
                    {activity.description &&
                        <div id="activity-item-description">{activity.description}</div>
                    }
                </div>
                {(currentUserId=== ownerId || itinerary?.collaborators?.includes(currentUserId)) && 
                    <div className="activity-update-buttons">
                        <button onClick={edit}>
                            <i className="fa-solid fa-pen fa-xl" style={{color: "#afc6bd" }}/>
                        </button>
                        <button onClick={remove}>
                            <i className="fa-solid fa-trash fa-xl" style={{color: "#afc6bd" }}/>
                        </button>
                    </div>
                }
            </div>
        
            {openEdit && (
                <Modal onClose={()=> setOpenEdit(false)}>
                    <ActivityModal itineraryId={activity.itineraryId} date={activity.date} activityId={activity._id} closeModal={()=>setOpenEdit(false)}/>
                </Modal>
            )}
        </>
    )
}