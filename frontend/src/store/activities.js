import jwtFetch from './jwt';

const RECEIVE_ACTIVITIES = 'activities/RECEIVE_ACTIVITIES';
export const RECEIVE_ACTIVITY = 'activities/RECEIVE_ACTIVITY';
const REMOVE_ACTIVITY = 'activities/REMOVE_ACTIVITY';

const receiveActivities = (activities) => ({
    type: RECEIVE_ACTIVITIES,
    activities
});

const receiveActivity = (activity) => ({
    type: RECEIVE_ACTIVITY,
    activity
});

const removeActivity = (activityId) => ({
    type: REMOVE_ACTIVITY,
    activityId
});

export const fetchActivities = (itineraryId) => async (dispatch) => {
    const res = await jwtFetch(`/api/itineraries/${itineraryId}/activities`);
    const data = await res.json();
    dispatch(receiveActivities(data.activities));
};

export const fetchActivity = (itineraryId, activityId) => async (dispatch) => {
    const res = await jwtFetch(`/api/itineraries/${itineraryId}/activities/${activityId}`);
    const data = await res.json();
    dispatch(receiveActivities(data.activities));
};

export const createActivity = (itineraryId, activity) => async(dispatch) => {
    const res = await jwtFetch(`/api/itineraries/${itineraryId}/activities`, {
        method: 'POST',
        body: JSON.stringify(activity)
    });
    const data = await res.json();
    dispatch(receiveActivity(data.activity));
};

export const updateActivity = (itineraryId, activity) => async dispatch =>{
    const res = await jwtFetch(`/api/itineraries/${itineraryId}/activities/${activity._id}`, {
        method: 'PATCH',
        body: JSON.stringify(activity)
    });
    const data = await res.json();
    dispatch(receiveActivity(data.activity));
}

export const deleteActivity = (activityId) => async (dispatch) => {
    await jwtFetch(`/api/activities/${activityId}`, {
        method: 'DELETE'
    });
    dispatch(removeActivity(activityId));
};

const activitiesReducer = (state = {}, action) => {
    const newState = {...state};
    switch(action.type) {
        case RECEIVE_ACTIVITIES:
            return { ...newState, ...action.activities };
        case RECEIVE_ACTIVITY:
            return {
                ...newState,
                [action.activity._id]: action.activity
            };
        case REMOVE_ACTIVITY: 
            delete newState[action.activityId];
            return newState;
        default:
            return state;
    };
};

export default activitiesReducer;