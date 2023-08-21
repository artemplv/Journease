import {
    useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteItinerary,
    likeItineraryDebounced,
    unlikeItineraryDebounced,
} from '../../store/itineraries';
import { useHistory } from 'react-router-dom';
import UserInfo from '../UserProfile/UserInfo';
import './ItineraryIndex.css';

export default function ItineraryIndexItem({ itinerary }) {
    const currentUser = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch();

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
            dispatch(unlikeItineraryDebounced(itinerary._id));
        } else {
           dispatch(likeItineraryDebounced(itinerary._id));
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
                    </div>
                </div>
            </div>
        </li>

    )
}