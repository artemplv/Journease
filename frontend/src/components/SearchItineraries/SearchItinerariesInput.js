import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { searchItinerariesDebounced } from "../../store/search";

const SearchItinerariesInput = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const searchResults = useSelector(state => Object.values(state.search));
    const history = useHistory();

    const handleChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value.trim()) {
          dispatch(searchItinerariesDebounced(e.target.value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/itineraries/search?title=${searchText}`)
    }

    return (
        <div className="itineraries-search-input">
            <div className="itineraries-search-container">
                <input 
                    type="text"
                    placeholder="Search by title"
                    value={searchText}
                    onChange={handleChange}/>
                <button onClick={handleSubmit}>Search</button>
            </div>
            { searchText && searchResults && 
                <ul id="search-dropdown">
                    {searchResults.map((result) => {
                        return(<li>{result.title}</li>)
                    })}
                </ul>}
        </div>
    )
};

export default SearchItinerariesInput;