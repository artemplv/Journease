import jwtFetch from './jwt';


const RECEIVE_ITINERARIES = "itineraries/RECEIVE_ITINERARIES";
const RECEIVE_ITINERARY = "itineraries/RECEIVE_ITINERARY";
const REMOVE_ITINERARY = "itineraries/REMOVE_ITINERARY";
const UPDATE_ITINERARY = "itineraries/UPDATE_ITINERARY";


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

const updateItinerary = (itineraryId, itinerary) =>({
    type: UPDATE_ITINERARY,
    itineraryId,
    itinerary
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

export const createItinerary = (itinerary) => async dispatch => {
    const res = await jwtFetch('/api/itineraries', {
        method: 'POST',
        body: JSON.stringify(itinerary)
    });

    const data = await res.json();
    dispatch(receiveItinerary(data.itinerary));
}

export const editItinerary = (itineraryId, itinerary) => async dispatch => {
    const res = await jwtFetch(`/api/itineraries/${itineraryId}`, {
        method: 'PATCH',
        body: JSON.stringify(itinerary)
    })

    dispatch(updateItinerary(itineraryId, itinerary));
}

export default function itinerariesReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_ITINERARIES:
            return {...newState, ...action.itineraries};
        case RECEIVE_ITINERARY:
            return {...newState, ...action.itinerary};
        case REMOVE_ITINERARY:
            delete newState[action.itineraryId];
            return newState;
        case UPDATE_ITINERARY:
            newState[action.itineraryId] = action.itinerary;
            return newState;
        default:
            return state;
    };

}