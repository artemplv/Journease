import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import { getCurrentUser } from './store/session';
import ItineraryIndex from './components/ItineraryIndex/ItineraryIndex';
import ItineraryShow from './components/ItineraryShow/ItineraryShow';
import SplashPage from './components/SplashPage/SplashPage'; 
import UserProfilePage from './components/UserProfile/UserProfilePage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AboutPage from './components/AboutPage/AboutPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <>
        <ScrollToTop/>
        <NavBar />
        <Switch>
          <Route exact path="/" component={SplashPage}/>

          <Route exact path="/profile" component={UserProfilePage} />

          <Route exact path="/itineraries" component={ItineraryIndex} />

          <Route exact path="/itineraries/:itineraryId" component={ItineraryShow} />

          <Route exact path="/about" component={AboutPage} />
        </Switch>
    </>
  );
}

export default App;
