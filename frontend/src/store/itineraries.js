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

// const updateItinerary = (itineraryId, itinerary) =>({
//     type: UPDATE_ITINERARY,
//     itineraryId,
//     itinerary
// })


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
    const { cover, title, description, dateStart, dateEnd } = itinerary;
    const formData = new FormData();
    // formData.append("ownerId", ownerId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateStart", dateStart);
    formData.append("dateEnd", dateEnd);
    // formData.append("collaborators", collaborators);
    // formData.append("activities", activities)
    if (cover) formData.append("cover", cover);
    try {
        const res = await jwtFetch('/api/itineraries', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        dispatch(receiveItinerary(data.itinerary));
    } catch(err) {
      const res = await err.json();
      if (res.statusCode === 500) {
        console.log(res.json())
        return res.json();
      }
    }
}

export const editItinerary = (itinerary) => async dispatch => {
    const { cover, title, description, dateStart, dateEnd } = itinerary;
    const formData = new FormData();
    // formData.append("ownerId", ownerId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dateStart", dateStart);
    formData.append("dateEnd", dateEnd);
    // formData.append("collaborators", collaborators);
    // formData.append("activities", activities)
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
        default:
            return state;
    };

}