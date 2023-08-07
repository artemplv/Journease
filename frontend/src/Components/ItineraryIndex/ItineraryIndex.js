import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItineraries } from "../../store/itineraries";
import ItineraryIndexItem from "./ItineraryIndexItem";
import './ItineraryIndex.css';

function ItineraryIndex() {
  // const dispatch = useDispatch();
  // const itineraries = useSelector(state => Object.values(state.itineraries));

  // useEffect(() => {
  //   dispatch(fetchItineraries())
  // }, []);

  const itineraries = [{itinerary: {coverImage: "/public/blep.jpeg", title: "Blep", owner: "Doge"}}, {itinerary: {coverImage: "/Users/vczaran/Desktop/Journease/frontend/public/blep.jpeg", title: "Blep2", owner: "Doge2"}}, {itinerary: {coverImage: "/public/blep.jpeg", title: "Blep", owner: "Doge"}}, {itinerary: {coverImage: "/public/blep.jpeg", title: "Blep", owner: "Doge"}}]
 
  const ItineraryList = itineraries.map(itinerary => {
    return (
      // <ItineraryIndexItem itinerary={itinerary} />
      <ItineraryIndexItem />
    );

  });

    return (
      <>
        <div>
          <h1 id="itinerary-index-page-title">All Trips</h1>
          <ul className="itineraries-index">
            {ItineraryList}
          </ul>
        </div>
        <footer>
          Copyright &copy; 2023 Journease
        </footer>
      </>
    );
  }
  
  export default ItineraryIndex;