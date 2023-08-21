import jwtFetch from './jwt';

import { RECEIVE_ACTIVITY } from './activities';
import { RECEIVE_USER } from './users';


const RECEIVE_ITINERARIES = "itineraries/RECEIVE_ITINERARIES";
const RECEIVE_ITINERARY = "itineraries/RECEIVE_ITINERARY";
const REMOVE_ITINERARY = "itineraries/REMOVE_ITINERARY";
const UPDATE_ITINERARY = "itineraries/UPDATE_ITINERARY";
const RECEIVE_ITINERARY_LIKE = "itineraries/RECEIVE_ITINERARY_LIKE";
const REMOVE_ITINERARY_LIKE = "itineraries/REMOVE_ITINERARY_LIKE";


const receiveItineraries = (itineraries) => ({
    type: RECEIVE_ITINERARIES,
    itineraries
})


const receiveItinerary = (itinerary) => ({
    type: RECEIVE_ITINERARY,
    itinerary
})

const removeItinerary = (itineraryId) => ({
    type: REMOVE_ITINERARY,
    itineraryId
})

const receiveItineraryLike = (like) => ({
    type: RECEIVE_ITINERARY_LIKE,
    like
})

const removeItineraryLike = (like) => ({
    type: REMOVE_ITINERARY_LIKE,
    like,
})

export const fetchItineraries = () => async dispatch => {
    const res = await jwtFetch('/api/itineraries');
    const data = await res.json();
    dispatch(receiveItineraries(data.itineraries));
}

export const fetchItinerary = (itineraryId) => async dispatch => {
    const res = await jwtFetch(`/api/itineraries/${itineraryId}`);
    const data = await res.json();
    dispatch(receiveItinerary(data.itinerary));
}

export const deleteItinerary = (itineraryId) => async dispatch => {
    await jwtFetch(`/api/itineraries/${itineraryId}`, {
        method: 'DELETE'
    });
    dispatch(removeItinerary(itineraryId));
}

export const likeItinerary = (itineraryId) => async dispatch => {
    const payload = {
        itineraryId,
    };

    try {
        const res = await jwtFetch('/api/likes', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        dispatch(receiveItineraryLike(data.like));
    } catch(err) {
    }
}

export const unlikeItinerary = (itineraryId) => async dispatch => {
    const payload = {
        itineraryId,
    };

    try {
        const res = await jwtFetch('/api/likes', {
            method: 'DELETE',
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        dispatch(removeItineraryLike(data.like));
    } catch(err) {
    }
}

export const createItinerary = (itinerary) => async dispatch => {
    const { cover, title, description, dateStart, dateEnd, collaborators } = itinerary;
    const formData = new FormData();
    
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateStart", dateStart);
    formData.append("dateEnd", dateEnd);
    collaborators.forEach((userId) => {
        formData.append('collaborators[]', userId);
    });
    if (cover) formData.append("cover", cover);
    
    try {
        const res = await jwtFetch('/api/itineraries', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        dispatch(receiveItinerary(data.itinerary));
        return data.itinerary;
    } catch(err) {
      const res = await err.json();
      if (res.statusCode === 500) {
        return res.json();
      }
    }
}

export const editItinerary = (itinerary) => async dispatch => {
    const { cover, title, description, dateStart, dateEnd, collaborators } = itinerary;
    const formData = new FormData();
    
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateStart", dateStart);
    formData.append("dateEnd", dateEnd);
    collaborators.forEach((userId) => {
        formData.append('collaborators[]', userId);
    });
    if (cover) formData.append("cover", cover);
    
    const res = await jwtFetch(`/api/itineraries/${itinerary.id}`, {
        method: 'PATCH',
        body: formData
    })
    const data = await res.json()
    dispatch(receiveItinerary(data.itinerary));
}

export default function itinerariesReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_ITINERARIES:
            return {...newState, ...action.itineraries};
        case RECEIVE_ITINERARY:
            return {...newState, [action.itinerary._id]: action.itinerary};
        case REMOVE_ITINERARY:
            delete newState[action.itineraryId];
            return newState;
        case UPDATE_ITINERARY:
            newState[action.itineraryId] = action.itinerary;
            return newState;
        case RECEIVE_ACTIVITY:
            return {
                ...newState,
                [action.activity.itineraryId]: {
                    ...newState[action.activity.itineraryId],
                    activities: [...newState[action.activity.itineraryId].activities, action.activity._id],
                },
            }
        case RECEIVE_USER:
            return {...state, ...action.userItineraries};
        case RECEIVE_ITINERARY_LIKE:
            const currentLikers = state[action.like.itineraryId].likerIds || [];
            
            return {
                ...state,
                [action.like.itineraryId]: {
                    ...state[action.like.itineraryId],
                    likerIds: [...currentLikers, action.like.likerId],
                },
            };
        case REMOVE_ITINERARY_LIKE:
            const newLikers = state[action.like.itineraryId].likerIds
                .filter((likerId) => likerId !== action.like.likerId);
            
            return {
                ...state,
                [action.like.itineraryId]: {
                    ...state[action.like.itineraryId],
                    likerIds: newLikers,
                },
            };
        default:
            return state;
    };

}