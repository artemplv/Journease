import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import { getCurrentUser } from './store/session';
import ItineraryIndex from './components/ItineraryIndex/ItineraryIndex';
import ItineraryShow from './components/ItineraryShow/ItineraryShow';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ItineraryIndex} />

        <Route exact path="/itineraries" component={ItineraryIndex} />

        <Route exact path="/itineraries/:itineraryId" component={ItineraryShow} />
      </Switch>
    </>
  );
}

export default App;