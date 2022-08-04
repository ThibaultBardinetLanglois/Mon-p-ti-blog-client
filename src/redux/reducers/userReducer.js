import { GET_USER, LOG_OUT } from "../actions/userActions";


const initialState = {
    user: {
        infos: {},
        isLogged: false
    }
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {...state, user: {infos: action.payload, isLogged: true}};
        case LOG_OUT:
            return initialState;
            //return {user: {infos: {}, isLogged: false}};
        default: 
            return state;
    }
    
}