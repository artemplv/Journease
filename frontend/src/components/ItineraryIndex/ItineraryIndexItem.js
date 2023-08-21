import {
    useMemo,
    useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    likeItinerary,
    unlikeItinerary,
} from '../../store/itineraries';
import { useHistory } from 'react-router-dom';
import UserInfo from '../UserProfile/UserInfo';
import './ItineraryIndex.css';

export default function ItineraryIndexItem({ itinerary }) {
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch();

    const [likePending, setLikePending] = useState(false);

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

    const handleLike = async () => {
        if (likePending) {
            return;
        }
        
        setLikePending(true);

        if (likedByCurrentUser) {
            await dispatch(unlikeItinerary(itinerary._id));
        } else {
            await dispatch(likeItinerary(itinerary._id));
        }
        
        setLikePending(false);
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