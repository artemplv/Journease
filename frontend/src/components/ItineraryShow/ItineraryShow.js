import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal } from "../../context/Modal";
import { deleteItinerary, fetchItinerary } from "../../store/itineraries";
import ActivityIndex from "../ItineraryActivities/ActivityIndex";
import './ItineraryShow.css'
import MapWrapper from "./Map";
import UserInfo from "../UserProfile/UserInfo";
import ItineraryModal from "../ItineraryModal/ItineraryModal";

export default function ItineraryShow () {
    const dispatch = useDispatch();
    const itineraryId = useParams().itineraryId;
    const [confirmModal, setConfirmModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const history = useHistory()
    const itinerary = useSelector(state => state.itineraries[itineraryId]);
    const startDate = new Date(itinerary?.dateStart).toDateString().slice(4)
    const endDate = new Date(itinerary?.dateEnd).toDateString().slice(4)
    const currentUser = useSelector(state => state.session.user)
    const [canEdit, setCanEdit] = useState(false)

    useEffect(() => {
        dispatch(fetchItinerary(itineraryId));
    }, [itineraryId]);

    useEffect(()=> {
        if (currentUser && itinerary) {
            if (currentUser._id === itinerary.ownerId || itinerary.collaborators?.includes(currentUser._id)) {
                setCanEdit(true)
            }
        } else {
            setCanEdit(false)
        }
    }, [itinerary, currentUser])

    const edit = () => {
        setOpenEditModal(true)
    }

    const confirmRemove = () => {
        setConfirmModal(true)
    }

    const remove = () => {
        history.push('/itineraries')
        dispatch(deleteItinerary(itineraryId))
        setConfirmModal(false)
    }

    const cancel = () => {
        setConfirmModal(false)
    }
    
    const CollaboratorsList = itinerary?.collaborators.map(collaborator => {
        return (
            <UserInfo key={collaborator} userId={collaborator} />
        )
    })

    return (
        <>
        {itinerary  && 
            <div className="itinerary-show-page">
                {confirmModal && 
                    <Modal onClose={()=> setConfirmModal(false)}>
                        <div className="confirm-delete-itinerary-modal">
                            <h1>Are you sure you would like to delete this itinerary?</h1>
                            <div className="delete-container">
                                <button id="delete-itinerary-button" onClick={remove}>Delete</button>
                                <button id="cancel-button" onClick={cancel}>Cancel</button>
                            </div>
                        </div>
                    </Modal>
                }

                <div className="itinerary-show-main-body">
                    <div className="itinerary-show-activity-container">
                        <div className="itinerary-show-header">
                            <div id="itinerary-show-image-container">
                                <img src={`${itinerary.coverImageUrl}`}/>
                            </div>
                            <div className="itinerary-header-text-box">
                                <div className="itinerary-header-text-box-description">
                                    <div className="itinerary-show-description">
                                        <h1>{itinerary.title}</h1>
                                            <div>
                                                <i className="fa-solid fa-calendar" style={{color: "#afc6bd",}}/>
                                                {startDate} to {endDate}
                                            </div>
                                            <div className="it-desc">
                                                <i className="fa-solid fa-note-sticky" style={{color: "#afc6bd",}}/>
                                                {itinerary.description}
                                            </div>
                                    </div>
                                    <div id="collaborators">
                                        <div id="collaborators-container">        
                                            <i className="fa-solid fa-user-pen" style={{color: "#afc6bd",}}/>
                                            <UserInfo userId={itinerary.ownerId} />
                                        </div>
                                        <div className="authors-container">
                                            <i className="fa-solid fa-users" style={{color: "#afc6bd",}}/>
                                            <div id="collaborators-only">
                                                {CollaboratorsList}
                                            </div>
                                        </div>
                                    </div>
                                    {canEdit && 
                                    <div className="itinerary-show-edit-buttons">
                                        <button onClick={edit}>
                                            <i className="fa-solid fa-pen fa-xl" style={{color: "#afc6bd",}}/>
                                        </button>
                                        <button onClick={confirmRemove}>
                                            <i className="fa-solid fa-trash fa-xl" style={{color: "#afc6bd",}}/>
                                        </button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <ActivityIndex itinerary={itinerary}/>
                    </div>
                    <div>
                        <MapWrapper itinerary={itinerary}/>
                    </div>
                    {openEditModal && 
                        <Modal onClose={()=>setOpenEditModal(false)}>
                            <ItineraryModal itinerary={itinerary} closeModal={()=> setOpenEditModal(false)}/>
                        </Modal>
                    }
                </div>
            </div>
        }
        </>
    )
}
