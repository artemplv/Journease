import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteActivity } from '../../store/activities';
import ActivityModal from '../ActivityModal/ActivityModal';
import './ActivityIndex.css'
import { Modal } from '../../context/Modal';

export default function ActivityItem({activity, ownerId}) {
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false)
    const currentUserId = useSelector(state => state.session.user?._id)

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
                    <img src={activity.place.photo}/>
                </div>
                <div id="activity-item-header">
                    <h2 id="activity-item-heading">{activity.title}</h2>
                    <div id="activity-item-description">{activity.description}</div>
                </div>
                {currentUserId=== ownerId && 
                    <div className="activity-update-buttons">
                        <button onClick={edit}>
                            <i className="fa-solid fa-pen fa-xl" style={{color: "#FFA9A3",}}/>
                        </button>
                        <button onClick={remove}>
                            <i className="fa-solid fa-trash fa-xl" style={{color: "#FFA9A3",}}/>
                        </button>
                    </div>
                }
            </div>
            {openEdit && (
                <Modal onClose={()=> setOpenEdit(false)}>
                    <ActivityModal itineraryId={activity.itineraryId} date={activity.date} activityId={activity._id}/>
                </Modal>
            )}
        </>
    )
}