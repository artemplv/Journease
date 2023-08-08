import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItineraries } from "../../store/itineraries";
import ItineraryIndexItem from "./ItineraryIndexItem";
import './ItineraryIndex.css';

function ItineraryIndex() {
  const dispatch = useDispatch();
  const itineraries = useSelector(state => Object.values(state.itineraries));

  useEffect(() => {
    dispatch(fetchItineraries())
  }, []);


  const ItineraryList = itineraries.map(itinerary => {
    return (
      <ItineraryIndexItem itinerary={itinerary} />
    );

  });

    return (
      <>
        <div>
          <h1 id="itinerary-index-page-title">ALL TRIPS</h1>
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