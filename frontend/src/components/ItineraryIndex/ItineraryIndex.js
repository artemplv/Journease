import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItineraries } from "../../store/itineraries";
import ItineraryIndexItem from "./ItineraryIndexItem";
import './ItineraryIndex.css';

function ItineraryIndex() {
  const dispatch = useDispatch();
  const itineraries = useSelector(state => Object.values(state.itineraries));
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(fetchItineraries())
  }, [currentUser]);


  const ItineraryList = itineraries.map(itinerary => {
    return (
      <ItineraryIndexItem itinerary={itinerary} />
    );

  });

    return (
      <>
        <div>
          <div id="itinerary-index-page-title">
            <img src="https://coffeebook-dev.s3.amazonaws.com/explore.png"/>
          </div>
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