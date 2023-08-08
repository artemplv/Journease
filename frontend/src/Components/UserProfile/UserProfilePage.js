import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, fetchUserItineraries } from '../../store/users';
import ItineraryIndexItem from '../ItineraryIndex/ItineraryIndexItem';



export default function UserProfilePage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userItineraries = useSelector(state => Object.values(state.users?.userItineraries));
 
    useEffect(() => {
        dispatch(fetchUser(currentUser?._id));
        dispatch(fetchUserItineraries(currentUser?._id))
    }, [currentUser, userItineraries.length]);

    const ItineraryList = userItineraries?.map(itinerary => {
        return (
            <ItineraryIndexItem itinerary={itinerary} />
        );
    });

    return (
        <>
            <img src={currentUser?.profileImageUrl}/>
            <h1>{currentUser?.username}</h1>
            {userItineraries && {ItineraryList}}
        </>
    )

}