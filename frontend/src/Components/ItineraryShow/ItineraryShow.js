import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItinerary } from "../../store/itineraries";
import ActivityIndex from "../Activities/ActivityDateNav";
import DateNav from "./DateNav";
import './ItineraryShow.css'
import MapWrapper from "./Map";
import { Modal } from '../../context/Modal';
import ActivityModal from "../ActivityModal/ActivityModal";

export default function ItineraryShow () {
    const dispatch = useDispatch();
    const itineraryId = useParams().itineraryId;

    const [modalType, setModalType] = useState("");

    const createActivity = () => {
        setModalType("create-activity")
    }
   
    useEffect(() => {
        dispatch(fetchItinerary(itineraryId));
    }, [itineraryId]);

    const itinerary = useSelector(state => state.itineraries[itineraryId]);
    const startDate = new Date(itinerary?.dateStart).toDateString().slice(4)
    const endDate = new Date(itinerary?.dateEnd).toDateString().slice(4)

    return (
        <>
        {itinerary && 
            <div className="itinerary-show-page">
                {(modalType === "create-activity") && (
                    <Modal onClose={()=> setModalType("")}>
                        <ActivityModal itineraryId={itineraryId}/>
                    </Modal>
                )}
                <div className="itinerary-show-header">
                    <div id="itinerary-show-image-container">
                        <img src={`${itinerary.coverImageUrl}`}/>
                    </div>
                    <div class="itinerary-show-description">
                        <h1>{itinerary.title}</h1>
                        <div>        
                            <i className="fa-solid fa-user-pen" style={{color: "#F87575",}}/>
                            {itinerary.ownerId}
                        </div>
                        <div>
                            <i className="fa-solid fa-note-sticky" style={{color: "#F87575",}}/>
                            {itinerary.description}
                        </div>
                        <div>
                            <i className="fa-solid fa-calendar" style={{color: "#F87575",}}/>
                            {startDate} to {endDate}
                        </div>
                        <div>
                            <i className="fa-solid fa-users" style={{color: "#F87575",}}/>
                            {itinerary.collaborators}
                        </div>
                    </div>
                </div>
                <div className="itinerary-show-main-body">
                    <DateNav itinerary={itinerary}/>
                    <div className="itinerary-show-activity-container">
                        <ActivityIndex itinerary={itinerary}/>
                    </div>
                    <div>
                        <MapWrapper/>
                    </div>
                </div>
                <button onClick={createActivity}>Create Activity</button>
            </div>
        }
        </>
    )
}