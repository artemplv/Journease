import { debounceThunkAction } from "../utils";
import jwtFetch from "./jwt";

export const GET_SEARCH_RESULTS = 'search/searchResults';
export const CLEAR_SEARCH_RESULTS = 'search/clearSearchResults';

export const receiveSearchResults = (searchResults) => ({
    type: GET_SEARCH_RESULTS,
    searchResults
})

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})
 
export const searchItineraries = (query) => async dispatch => {
    const res = await jwtFetch(`/api/itineraries/search?title=${query}`);
    const data = await res.json();
    dispatch(receiveSearchResults(data));
}

export const searchItinerariesDebounced = debounceThunkAction(searchItineraries, 600);

export default function searchReducer (state = {}, action) {
    const newState = {...state};

    switch (action.type) {
        case GET_SEARCH_RESULTS:
            return {...action.searchResults.itineraries};
        case CLEAR_SEARCH_RESULTS:
            return {};
        default:
            return state;
    }

}