import jwtFetch from "./jwt";

const RECEIVE_USER = "users/RECEIVE_USER";


const receiveUser = (user, userItineraries) => ({
    type: RECEIVE_USER,
    user,
    userItineraries
})


export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user, data.userItineraries));
}


export default function usersReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            return {...newState, [action.user._id]: action.user, userItineraries: action.userItineraries};
        default:
            return state;
    }
}
