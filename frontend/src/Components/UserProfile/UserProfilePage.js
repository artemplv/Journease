import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/users';
import ItineraryIndexItem from '../ItineraryIndex/ItineraryIndexItem';
import { useHistory, Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import './UserProfile.css';
import { Modal } from '../../context/Modal';
import ProfileEditForm from './ProfileEditForm';



export default function UserProfilePage () {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[currentUser?._id]);

    const [modalType, setModalType] = useState("")

    const editImage = () => {
        setModalType("edit-profile")
    }

    useEffect(() => {
        if (!currentUser) {
            history.push('/itineraries');
        } else {
            dispatch(fetchUser(currentUser?._id));
        };
    }, [currentUser, userItineraries?.length]);


    const ItineraryList = user.itineraries?.map(itineraryId => {
        return (
            <ItineraryIndexItem itinerary={itinerary} />
        );
    });

    return (
        <div className='user-profile-page'>
            <UserInfo currentUser={currentUser} />
            <button onClick={editImage}>Change Profile Picture</button>
            {(modalType === 'edit-profile') && (
                <Modal onClose={() => setModalType("")}>
                    <ProfileEditForm currentUserId={currentUser._id}/>
                </Modal>
            )}
            <h1>My Itineraries</h1>
            <div className='user-itineraries'>
                {userItineraries && ItineraryList}
                {(userItineraries?.length === 0) && <p>No trips yet 😢 Create one now!</p>}
            </div>

            <h1>My Wishlist</h1>
            <div className='user-wishlist'>
                <p>No Wishlist yet 😢</p>
                <Link to="/itineraries">Browse Itineraries</Link>
            </div>
        </div>
    )

}