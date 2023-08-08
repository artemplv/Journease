import jwtFetch from "./jwt";

export const RECEIVE_USER = "users/RECEIVE_USER";
 

const receiveUser = (user, userItineraries, itinerariesIds) => ({
    type: RECEIVE_USER,
    user,
    userItineraries,
    itinerariesIds
})

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


export default function usersReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_USER:
            return {...newState, [action.user._id]: {...action.user, itineraries: action.itinerariesIds} };
        default:
            return state;
    }
}
