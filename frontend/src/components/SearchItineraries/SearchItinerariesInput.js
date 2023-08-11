import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { searchItinerariesDebounced } from "../../store/search";
import InputField from "../InputField/InputField";
import './SearchItinerariesInput.css'

const SearchItinerariesInput = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const searchResults = useSelector(state => Object.values(state.search));
    const [inputFocused, setInputFocused] = useState(false);
    const history = useHistory();
    const inputRef = useRef(null); 

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

    const handleRedirect = (id) => {
        return () => {
            history.push(`/itineraries/${id}`)
        };
    };

    const handleFocus = () => {
        setInputFocused(true);
      };
    
      const handleBlur = () => {
        setInputFocused(false);
      };

    return (
        <div className="itineraries-search-input">
            <div id="itineraries-search">
                <InputField 
                    type="text"
                    placeholder="Search by title "
                    ref={inputRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={searchText}
                    onChange={handleChange}/>
                <i 
                    id="plane-submit"
                    class="fa-regular fa-paper-plane" 
                    onClick={handleSubmit}/>
            </div>
            { searchText && searchResults && inputFocused &&
                <ul id="search-dropdown">
                    {searchResults.map((result) => {
                        return(
                            <li onMouseDown={handleRedirect(result._id)}>
                                    {result.title}</li>)
                    })}
                </ul>}
        </div>
    )
};

export default SearchItinerariesInput;