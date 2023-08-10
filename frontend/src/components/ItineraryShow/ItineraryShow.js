import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItinerary } from "../../store/itineraries";
import ActivityIndex from "../ItineraryActivities/ActivityIndex";
import DateNav from "./DateNav";
import './ItineraryShow.css'
import MapWrapper from "./Map";
import UserInfo from "../userProfile/UserInfo";

export default function ItineraryShow () {
    const dispatch = useDispatch();
    const itineraryId = useParams().itineraryId;
   
    useEffect(() => {
        dispatch(fetchItinerary(itineraryId));
    }, [itineraryId]);

    const itinerary = useSelector(state => state.itineraries[itineraryId]);
    const startDate = new Date(itinerary?.dateStart).toDateString().slice(4)
    const endDate = new Date(itinerary?.dateEnd).toDateString().slice(4)

    const CollaboratorsList = itinerary?.collaborators.map(collaborator => {
        return (
            <UserInfo userId={collaborator} />
        )
    })

    return (
        <>
        {itinerary && 
            <div className="itinerary-show-page">
                <div className="itinerary-show-header">
                    <div id="itinerary-show-image-container">
                        <img src={`${itinerary.coverImageUrl}`}/>
                    </div>
                    <div className="itinerary-show-description">
                        <h1>{itinerary.title}</h1>
                        <div className="owner-info">        
                            <i className="fa-solid fa-user-pen" style={{color: "#F87575",}}/>
                            <UserInfo userId={itinerary.ownerId}/>
                        </div>
                        <div>
                            <i className="fa-solid fa-note-sticky" style={{color: "#F87575",}}/>
                            {itinerary.description}
                        </div>
                        <div>
                            <i className="fa-solid fa-calendar" style={{color: "#F87575",}}/>
                            {startDate} to {endDate}
                        </div>
                        <div className="collabs-info">
                            <i className="fa-solid fa-users" style={{color: "#F87575",}}/>
                            {CollaboratorsList}
                        </div>
                    </div>
                </div>
                <div className="itinerary-show-main-body">
                    <DateNav itinerary={itinerary}/>
                    <div className="itinerary-show-activity-container">
                        <ActivityIndex itinerary={itinerary}/>
                    </div>
                    <div>
                        <MapWrapper itinerary={itinerary}/>
                    </div>
                </div>
            </div>
        }
        </>
    )
}