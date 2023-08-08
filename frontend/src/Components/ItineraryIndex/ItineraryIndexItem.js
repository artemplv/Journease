import './ItineraryIndex.css';
import { Link } from "react-router-dom";
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
    }, [itinerary])

    const remove = () => {
        dispatch(deleteItinerary(itinerary._id))
    }

    const redirectShow = () => {
        history.push(`/itineraries/${itinerary._id}`)
    }

    return (
        <li className="itinerary-index-item" onClick={redirectShow}>
            {/* <img src={currentUser.profileImageUrl}/> */}
            <img src={itinerary.coverImageUrl}/>
            <div id="itinerary-card-info">
                <div id="index-thumbnail">
                    <img src={`${itinerary.coverImageUrl}`}/>
                </div>
                <h1>{itinerary.title}</h1>
                <div id="itinerary-card-subinfo">
                    <p>{itinerary.owner}</p>
                    <p>💕Likes</p>
                </div>
                {showUpdate && 
                <>
                    <button onClick={()=> setOpenModal(true)}>Edit</button> 
                    {openModal && 
                        <Modal onClose={()=> setOpenModal(false)}>
                            <ItineraryModal itinerary={itinerary}/>
                        </Modal>
                    }
                    <button onClick={remove}>Delete</button>
                </>
                }
            </div>
        </li>

    )
}