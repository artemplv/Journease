import jwtFetch from "./jwt";

const RECEIVE_USER = "users/RECEIVE_USER";
const RECEIVE_USER_ITINERARIES = "users/RECEIVE_USER_ITINERARIES";


const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

const receiveUserItineraries = userItineraries => ({
    type: RECEIVE_USER_ITINERARIES,
    userItineraries
})


export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user));
}

export const fetchUserItineraries = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}/itineraries`);
    const data = await res.json();
    dispatch(receiveUserItineraries(data.userItineraries));
}


export default function usersReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            return {...newState, [action.user._id]: action.user};
        case RECEIVE_USER_ITINERARIES:
            return {...newState, userItineraries: action.userItineraries};
        default:
            return state;
    }
}
