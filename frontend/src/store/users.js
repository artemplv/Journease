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
            return {...newState, [action.user._id]: action.user, userItineraries: action.userItineraries};
        default:
            return state;
    }
}
