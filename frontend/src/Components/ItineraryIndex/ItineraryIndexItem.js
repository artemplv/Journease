import './ItineraryIndex.css';

export default function ItineraryIndexItem() {

    return (
        <li className="itinerary-index-item">
            <img src={`${itinerary}.coverImage`}/>
            <div id="itinerary-card-info">
                <p>{itinerary.title}</p>
                <p>{itinerary.owner}</p>
                <p>💕Likes</p>
            </div>
        </li>
    )
}