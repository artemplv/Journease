import { useSelector } from "react-redux";
import ItineraryIndexItem from "../ItineraryIndex/ItineraryIndexItem";
import './SearchResultPage.css';
import SearchItinerariesInput from "../SearchItineraries/SearchItinerariesInput";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const SearchResultPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("title");
    const itineraries = Object.values(useSelector(state => state.search));
  
    return (
        <div className="search-results-page">
            <div className="search-page-headers">
                <h1>Search Results for "{query}":</h1>
                <SearchItinerariesInput />
            </div>
            <div className="search-results-container">
                { itineraries.map((itinerary) => {
                    return(
                        <ItineraryIndexItem itinerary={itinerary}/>
                    )
                })}
            </div>
        </div>
    )
};

export default SearchResultPage;