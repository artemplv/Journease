import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "../../context/Modal";
import { deleteItinerary, editItinerary, fetchItinerary } from "../../store/itineraries";
import ActivityIndex from "../ItineraryActivities/ActivityIndex";
import DateNav from "./DateNav";
import './ItineraryShow.css'
import MapWrapper from "./Map";

export default function ItineraryShow () {
    const dispatch = useDispatch();
    const itineraryId = useParams().itineraryId;
    const [confirmModal, setConfirmModal] = useState(false)
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchItinerary(itineraryId));
    }, [itineraryId]);

    const itinerary = useSelector(state => state.itineraries[itineraryId]);
    const startDate = new Date(itinerary?.dateStart).toDateString().slice(4)
    const endDate = new Date(itinerary?.dateEnd).toDateString().slice(4)

    const edit = () => {
        dispatch(editItinerary)
    }

    const confirmRemove = () => {
        setConfirmModal(true)
    }

    const remove = () => {
        history.push('/itineraries')
        dispatch(deleteItinerary(itineraryId))
        setConfirmModal(false)
    }

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
                    </div>
                    <div id="collaborators">
                        <i className="fa-solid fa-users" style={{color: "#F87575",}}/>
                        {itinerary.collaborators}
                    </div>
                    <button onClick={edit}>
                        <i className="fa-solid fa-pen" style={{color: "#F87575",}}/>
                    </button>
                    <button onClick={confirmRemove}>
                        <i className="fa-solid fa-trash" style={{color: "#F87575",}}/>
                    </button>
                </div>
                {confirmModal && 
                    <Modal onClose={()=> setConfirmModal(false)}>
                        <div className="confirm-delete-itinerary-modal">
                            <div>Are you sure you would like to delete this itinerary?</div>
                            <button onClick={remove}>Delete</button>
                        </div>
                    </Modal>
                }
                <div className="itinerary-show-main-body">
                    {/* <DateNav itinerary={itinerary}/> */}
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