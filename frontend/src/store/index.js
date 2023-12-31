import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import itinerariesReducer from './itineraries';
import usersReducer from './users';
import activitiesReducer from './activities';
import searchReducer from './search';

const rootReducer = combineReducers({
  session,
  errors,
  itineraries: itinerariesReducer,
  users: usersReducer,
  activities: activitiesReducer,
  search: searchReducer
});
let enhancer;


if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
