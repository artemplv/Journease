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
      <ItineraryIndexItem
        key={itinerary?._id}
        itinerary={itinerary}
      />
    );

  });

    return (
      <>
        <div>
          <div id="itinerary-index-page-title">
            <h1 className="explore-itineraries-text">Explore itineraries</h1>
            <input className="index-search" placeholder="Search by title"/>
            <button className="index-browse-all">or browse all...</button>
          </div>
          <h1 className="label-recent-itineraries">Recent itineraries</h1>
          <div className="itineraries-index-container">
            <ul className="itineraries-index">
              {ItineraryList}
            </ul>
          </div>
        </div>
        <footer>
          Copyright &copy; 2023 Journease
        </footer>
      </>
    );
  }
  
  export default ItineraryIndex;