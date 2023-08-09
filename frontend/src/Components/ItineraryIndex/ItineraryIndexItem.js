import './ItineraryIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from '../../context/Modal';
import ItineraryModal from '../ItineraryModal/ItineraryModal';
import { deleteItinerary } from '../../store/itineraries';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ItineraryIndexItem({itinerary}) {
    const currentUser = useSelector(state => state.session.user)
    const [showUpdate, setShowUpdate] = useState(false) 
    const [openModal, setOpenModal] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(()=> {
        if (currentUser && itinerary.ownerId === currentUser._id) {
                setShowUpdate(true)
        }  else {
            setShowUpdate(false)
        }
    }, [itinerary, itinerary.photoUrl])

    const remove = () => {
        dispatch(deleteItinerary(itinerary._id))
    }

    const redirectShow = () => {
        history.push(`/itineraries/${itinerary._id}`)
    }

    return (
        <li className="itinerary-index-item">
            {/* <img src={currentUser.profileImageUrl}/> */}
            <div id="itinerary-card-info">
                <div id="index-thumbnail" onClick={redirectShow}>
                    <img src={`${itinerary.coverImageUrl}`} alt="" />
                </div>
                <h1>{itinerary?.title}</h1>
                <div id="itinerary-card-subinfo">
                    <p>{itinerary.ownerId}</p>
                    <p>                            
                        <i className="fa-solid fa-heart fa-2xl" style={{color: "#FFA9A3",}}/>
                    </p>
                </div>
                {showUpdate && 
                <>
                    <div className="update-itinerary-buttons">
                        <button onClick={()=> setOpenModal(true)}>
                            <i className="fa-solid fa-pen fa-xl" style={{color: "#FFA9A3",}}/>
                        </button> 
                        {openModal && 
                            <Modal onClose={()=> setOpenModal(false)}>
                                <ItineraryModal itinerary={itinerary}/>
                            </Modal>
                        }
                        <button onClick={remove}>
                            <i className="fa-solid fa-trash fa-xl" style={{color: "#FFA9A3",}}/>
                        </button>
                    </div>
                </>
                }
            </div>
        </li>

    )
}