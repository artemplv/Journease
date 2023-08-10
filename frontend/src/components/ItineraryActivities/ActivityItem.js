import { useDispatch } from 'react-redux'
import { deleteActivity } from '../../store/activities';
import './ActivityIndex.css'

export default function ActivityItem({activity}) {
    const dispatch = useDispatch();

    const remove = () => {
        dispatch(deleteActivity(activity._id))
    }

    return (
        <div className="activity-item">
            <div id="activity-item-img">
                <img src={activity.place.photo}/>
            </div>
            <h2>{activity.title}</h2>
            <button onClick={remove}>Delete</button>
        </div>

    )
}