import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/users';
import ItineraryIndexItem from '../itineraryIndex/ItineraryIndexItem';
import { useHistory, Link } from 'react-router-dom';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import ProfileEditForm from './ProfileEditForm';



export default function UserProfilePage () {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[currentUser?._id]);
    const [modalType, setModalType] = useState("")
    const itineraries = useSelector(state => Object.values(state.itineraries));
    
    const editImage = () => {
        setModalType("edit-profile")
    }

    useEffect(() => {
        if (!currentUser) {
            history.push('/itineraries');
        } else {
            dispatch(fetchUser(currentUser?._id));
        };
    }, [currentUser, user?.profileImageUrl]); 
    // ADD user.likedItineraries to dependency array

    const userItineraries = itineraries.filter((itinerary) => itinerary?.ownerId == user?._id);

    // const likedItineraries = itineraries.filter((itinerary) => itinerary?._id in user?.likedItineraries);s

    const ItineraryList = userItineraries?.map(itinerary => {
        return (
            <ItineraryIndexItem itinerary={itinerary} />
        );
    });

    // const LikedItineraryList = likedItineraries?.map(itinerary => {
    //     return (
    //         <ItineraryIndexItem itinerary={itinerary} />
    //     );
    // });

    return (
        <div className="profile-container">
            <div className='user-profile-page'>
                <div className='user-profile-info'>
                    <img src={user?.profileImageUrl} />
                    <p className="username-label">{user?.username}</p>
                    <button onClick={editImage}>Change Profile Picture</button>
                </div>
                {(modalType === 'edit-profile') && (
                    <Modal onClose={() => setModalType("")}>
                        <ProfileEditForm currentUserId={currentUser._id} setModalType={setModalType}/>
                    </Modal>
                )}
                <h1 className="user-profile-labels">My Itineraries</h1>
                <div className='user-itineraries'>
                    {user?.itineraries && ItineraryList}
                    {(user?.itineraries?.length === 0) && <p>No trips yet 😢 Create one now!</p>}
                </div>

                <h1 className="user-profile-labels">My Wishlist</h1>
                <div className='user-wishlist'>
                    <p>No Wishlist yet 😢</p>
                    <Link to="/itineraries">Browse Itineraries</Link>
                </div>

            </div>
        </div>
    )

}