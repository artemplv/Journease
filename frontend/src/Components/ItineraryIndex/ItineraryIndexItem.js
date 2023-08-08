import './ItineraryIndex.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal } from '../../context/Modal';
import ItineraryModal from '../ItineraryModal/ItineraryModal';
import { deleteItinerary } from '../../store/itineraries';

export default function ItineraryIndexItem({itinerary}) {
    const currentUser = useSelector(state => state.session.user)
    const [showUpdate, setShowUpdate] = useState(false) 
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=> {
        if (currentUser) {
            if (itinerary.ownerId === currentUser._id) {
                setShowUpdate(true)
            } 
        } else {
            setShowUpdate(false)
        }
    }, [currentUser?._id])

    const remove = () => {
        dispatch(deleteItinerary(itinerary._id))
    }

    return (
        <li className="itinerary-index-item">
            {/* <img src={currentUser.profileImageUrl}/> */}
            <Link to={`/itineraries/${itinerary._id}`}><img src={itinerary.coverImageUrl}/></Link>
            <div id="itinerary-card-info">
                <Link to={`/itineraries/${itinerary._id}`}><h1>{itinerary.title}</h1></Link>
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