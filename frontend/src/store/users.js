import jwtFetch from "./jwt";
import { debounceThunkAction } from '../utils';

export const RECEIVE_USER = "users/RECEIVE_USER";
// const RECEIVE_USER_ITINERARIES = "users/RECEIVE_USER_ITINERARIES";
const RECEIVE_USERS = "users/RECEIVE_USERS";

// ADD LIKED ITINERARIES TO ARGS!!!
const receiveUser = (user, userItineraries, itinerariesIds) => ({
    type: RECEIVE_USER,
    user,
    userItineraries,
    itinerariesIds
    // likedItineraries
})

// const receiveUserItineraries = userItineraries => ({
//     type: RECEIVE_USER_ITINERARIES,
//     userItineraries
// })

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users,
});

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user, data.userItineraries, data.itinerariesIds));
}

export const updateUser = (image, currentUserId) => async dispatch => {
   const formData = new FormData();

   formData.append("image", image);

    const res = await jwtFetch(`/api/users/${currentUserId}`, {
        method: 'PATCH',
        body: formData
    })
  
    const data = await res.json();
  
    dispatch(receiveUser(data.user));
}

export const searchUsers = (searchQuery, limit = 5, callback = () => {}) => async (dispatch) => {
    const res = await jwtFetch(`/api/users/search?username=${searchQuery}&limit=${limit}`);
    const data = await res.json();
    dispatch(receiveUsers(data.users.byId));
    callback(data.users.allIds);
}

export const searchUsersDebounced = debounceThunkAction(searchUsers, 600);

export default function usersReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            return {...newState, [action.user._id]: {...action.user, itineraries: action.itinerariesIds, likedItineraries: action.likedItineraries} };
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
