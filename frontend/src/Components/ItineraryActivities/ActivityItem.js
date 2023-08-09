import './ActivityIndex.css'

export default function ActivityItem({activity}) {
    return (
        <div className="activity-item">
            <div id="activity-item-img">
                <img src={activity.place.photo}/>
            </div>
            <h2>{activity.title}</h2>
        </div>
    )
}