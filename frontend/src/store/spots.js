import { csrfFetch } from './csrf';

//Action types
const CREATE_SPOT = "spots/createSpot"
const READ_SPOT = "spots/readSpot"
const READ_ALL_SPOTS = "spots/readAllSpots"
const UPDATE_SPOT = "spots/updateSpot"
const DELETE_SPOT = "spots/deleteSpot"


//Action Creators
const createSpot = (newSpot) => {
    return{
        type: CREATE_SPOT,
        payload: newSpot
    }
}


const readSpot = (spot) => {
    return{
        type: READ_SPOT,
        spot
    }
}

const readAllSpots = (spots) => {
    return{
        type: READ_ALL_SPOTS,
        spots
    }
}

const updateSpot = (spot) => {
    return{
        type: UPDATE_SPOT,
        payload: spot
    }
}

const deleteSpot = (spotId) => {
    return{
        type: DELETE_SPOT,
        spotId
    }
}


//THUNKS

export const loadAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
      method: 'GET'
    });
    if(response.ok){
        const data= await response.json();
         dispatch(readAllSpots(data.Spots));
    }
    return response;
  };

  export const readSpotThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method: 'GET'
    })

    if(response.ok){
        const data = await response.json()
        
        dispatch(readSpot(data))
      
        return data 
   
   
    }
   
  }

  export const createSpotThunk = (spotData) => async (dispatch) => {

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create spot');
    }

    const newSpot = await response.json();
    dispatch(createSpot(newSpot));
    return newSpot;
};

  export const updateSpotThunk = (id, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(updateSpot(data))
        return data
    }
  }


export const deleteSpotThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
      method: 'DELETE'
    });
    if(response.ok){
       
         dispatch(deleteSpot(id));
    }
  }; 



  const initialState = {}



const spotReducer = (state = initialState, action) => {
    let newState;
    let spots;
    switch(action.type){
        case CREATE_SPOT:
            newState = { ...state };
            newState[action.payload.id] = {...action.payload};
            return newState;
        case READ_SPOT:
            newState = {...state}
            
            newState[action.spot.id] = {...action.spot}
            return newState;
        case READ_ALL_SPOTS:
            
            spots= {}
            if(action.spots) 
                action.spots.forEach(spot => {spots[spot.id] = spot})
            return spots
        case UPDATE_SPOT:
            newState = { ...state };
            newState[action.payload.id] = { ...action.payload };
            return newState;
        case DELETE_SPOT:
            newState = {...state}
            delete newState[action.spotId]
            return newState;
        default:
            return state;
    }
}

export default spotReducer;