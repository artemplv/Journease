import './ItineraryIndex.css';
import { Link } from "react-router-dom";

export default function ItineraryIndexItem({itinerary}) {

    return (
        <li className="itinerary-index-item">
            <div id="itinerary-card-info">
                <Link to={`/itineraries/${itinerary._id}`}><img src={`${itinerary.coverImageUrl}`}/></Link>
                <Link to={`/itineraries/${itinerary._id}`}><h1>{itinerary.title}</h1></Link>
                <div id="itinerary-card-subinfo">
                    <p>{itinerary.owner}</p>
                    <p>💕Likes</p>
                </div>
            </div>
        </li>

    )
}