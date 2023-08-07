import './ItineraryIndex.css';

export default function ItineraryIndexItem(itinerary) {
    
    return (
        // <li className="itinerary-index-item">
        //     <img src={`${itinerary.coverImage}`}/>
        //     <div id="itinerary-card-info">
        //         <p>{itinerary.title}</p>
        //         <p>{itinerary.owner}</p>
        //         <p>💕Likes</p>
        //     </div>
        // </li>
        <li className="itinerary-index-item">
            <img src="blep.jpeg"/>
            <div id="itinerary-card-info">
                <h1>ALL TRIPS</h1>
                <div id="itinerary-card-subinfo">
                    <p>Owner name</p>
                    <p>💕Likes</p>
                </div>
            </div>
        </li>
    )
}