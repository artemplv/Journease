import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItinerary } from "../../store/itineraries";
import './ItineraryShow.css';
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
        
    return (
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
                <h1>{itinerary?.title}</h1>
                <div className="itinerary-users">
                    <p>{itinerary?.owner}</p>
                    <p>{itinerary?.collaborators}</p>
                </div>
                <div>{itinerary?.description}</div>
            </div>
            <button onClick={createActivity}>Create Activity</button>
        </div>
    )
}