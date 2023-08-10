import { useSelector } from "react-redux";
import ItineraryIndexItem from "../ItineraryIndex/ItineraryIndexItem";

const SearchResultPage = () => {
    const itineraries = Object.values(useSelector(state => state.search));

    return (
        <>
        <div className="search-results-container">
            { itineraries.map((itinerary) => {
                return(
                    <ItineraryIndexItem itinerary={itinerary}/>
                )
            })}
        </div>
        </>
    )
};

export default SearchResultPage;