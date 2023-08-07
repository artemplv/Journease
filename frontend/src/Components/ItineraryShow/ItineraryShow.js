import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItinerary } from "../../store/itineraries";
import './ItineraryShow.css';

export default function ItineraryShow () {
    const dispatch = useDispatch();
    const itineraryId = useParams().itineraryId;
   
    useEffect(() => {
        dispatch(fetchItinerary(itineraryId));
    }, [itineraryId]);


    const itinerary = useSelector(state => state.itineraries[itineraryId]);
        
    return (
        <div className="itinerary-show-page">
            <div className="itinerary-show-headers">
                <div className="itinerary-show-img-container">
                    <img src={`${itinerary.coverImageUrl}`}/>
                    <h1>{itinerary?.title}</h1>
                </div>
                <div className="itinerary-users">
                    <p>{itinerary?.owner}</p>
                    <p>{itinerary?.collaborators}</p>
                </div>
            </div>
            <p>{itinerary?.description}</p>
        </div>
    )
}