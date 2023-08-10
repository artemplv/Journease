import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './Components/routes/Routes';
import NavBar from './Components/navBar/NavBar';

import { getCurrentUser } from './store/session';
import ItineraryIndex from './Components/itineraryIndex/ItineraryIndex';
import ItineraryShow from './components/itineraryShow/ItineraryShow';
import SplashPage from './Components/splashPage/SplashPage'; 
import UserProfilePage from './Components/userProfile/UserProfilePage';
import AboutPage from './Components/aboutPage/AboutPage';

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
        <Route exact path="/" component={SplashPage}/>

        <Route exact path="/profile" component={UserProfilePage} />

        <Route exact path="/about" component={AboutPage}/>

        <Route exact path="/itineraries" component={ItineraryIndex} />

        <Route exact path="/itineraries/:itineraryId" component={ItineraryShow} />

      </Switch>
    </>
  );
}

export default App;