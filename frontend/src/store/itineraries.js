import jwtFetch from './jwt';


const RECEIVE_ITINERARIES = "itineraries/RECEIVE_ITINERARIES";
const RECEIVE_ITINERARY = "itineraries/RECEIVE_ITINERARY";


const receiveItineraries = (itineraries) => ({
    type: RECEIVE_ITINERARIES,
    itineraries
})


const receiveItinerary = (itinerary) => ({
    type: RECEIVE_ITINERARY,
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

export default function itinerariesReducer (state = {}, action) {
    const newState = {...state};

    switch(action.type) {
        case RECEIVE_ITINERARIES:
            return {...newState, ...action.itineraries};
        case RECEIVE_ITINERARY:
            return {...newState, ...action.itinerary};
        default:
            return state;
    };

}