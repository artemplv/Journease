import jwtFetch from "./jwt";
import { debounceThunkAction } from '../utils';

const RECEIVE_USER = "users/RECEIVE_USER";
// const RECEIVE_USER_ITINERARIES = "users/RECEIVE_USER_ITINERARIES";
const RECEIVE_USERS = "users/RECEIVE_USERS";


const receiveUser = (user, userItineraries) => ({
    type: RECEIVE_USER,
    user,
    userItineraries
})

// const receiveUserItineraries = userItineraries => ({
//     type: RECEIVE_USER_ITINERARIES,
//     userItineraries
// })

const receieUsers = (users) => ({
    type: RECEIVE_USERS,
    users,
});

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user, data.userItineraries));
}

// export const fetchUserItineraries = (userId) => async dispatch => {
//     const res = await jwtFetch(`/api/users/${userId}/itineraries`);
//     const data = await res.json();
//     dispatch(receiveUserItineraries(data.userItineraries));
// }

export const searchUsers = (searchQuery, limit = 5, callback = () => {}) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/search?username=${searchQuery}&limit=${limit}`);
    const data = await res.json();
    dispatch(receieUsers(data.users.byId));
    callback(data.users.allIds);
}

export const searchUsersDebounced = debounceThunkAction(searchUsers, 600);

export default function usersReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            return {...newState, [action.user._id]: action.user, userItineraries: action.userItineraries};
        // case RECEIVE_USER_ITINERARIES:
        //     return {...newState, userItineraries: action.userItineraries};
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users,
            };
        default:
            return state;
    }
}
