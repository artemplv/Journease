import {
    useState,
    useEffect,
    useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import ItineraryModal from '../ItineraryModal/ItineraryModal';
import {
    deleteItinerary,
    likeItinerary,
    unlikeItinerary,
} from '../../store/itineraries';
import { useHistory } from 'react-router-dom';
import UserInfo from '../UserProfile/UserInfo';
import './ItineraryIndex.css';

export default function ItineraryIndexItem({ itinerary }) {
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

    const likedByCurrentUser = useMemo(() => {
        if (!currentUser || !itinerary || !itinerary.likerIds) {
            return false;
        }
        return itinerary.likerIds.includes(currentUser._id);
    }, [
        currentUser,
        currentUser?._id,
        itinerary,
    ]);

    const handleLike = () => {
        if (likedByCurrentUser) {
            dispatch(unlikeItinerary(itinerary._id));
        } else {
           dispatch(likeItinerary(itinerary._id));
        }
    }

    const numOfLikes = itinerary?.likerIds?.length || 0;

    return (
        <li className="itinerary-index-item">
            <div className="itinerary-card-info">
                <div id="index-thumbnail" onClick={redirectShow}>
                    <img src={`${itinerary.coverImageUrl}`}/>
                </div>
                <h1>{itinerary?.title}</h1>
                <div className="itinerary-card-subinfo">
                    <UserInfo userId={itinerary.ownerId}/>
                    <div className="itinerary-subinfo-buttons">
                        
                        <button
                            className="like-button"
                            onClick={handleLike}
                            disabled={!currentUser}
                        > 
                            {
                                numOfLikes > 0 && (
                                    <span className="it-likes-num">
                                        {numOfLikes}
                                    </span>
                                )
                            }
                            {
                                likedByCurrentUser ? (
                                    <i className="fa-solid fa-heart fa-2xl" />
                                ) : (
                                    <i className="fa-regular fa-heart fa-2xl" />
                                )
                            }
                        </button>
                        
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
                </div>
            </div>
        </li>

    )
}