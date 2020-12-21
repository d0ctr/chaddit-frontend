import {loginAPI} from "../../api/api";
import {FAILURE, LOGIN, LOGOUT, REGISTER} from "./types";

let api_token = localStorage.getItem('api_token');
const initialState = api_token ? {loggedIn: true, apiToken: api_token} : {};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('api_token', action.apiToken);
            return {
                ...state,
                loggedIn: true,
                apiToken: action.apiToken,

            }
        case FAILURE:
            return {
                ...state,
            }
        case REGISTER:
            return {
                ...state,
                loggedIn: true,
                apiToken: action.apiToken,
            }
        case LOGOUT:
            localStorage.removeItem('api_token');
            return {
                ...state,
                loggedIn: false,
                apiToken: '',
            };

        default:
            return state;
    }

}

export const loginActionCreator = (email, password) => (dispatch) => {
    return loginAPI.login(email, password)
        .then((response) => {
            dispatch({type: LOGIN, apiToken: response.data.api_token})
        }, (error) => {
            dispatch({type: FAILURE, error: error})
        });
}

export const registerActionCreator = (name, email, password) => (dispatch) => {
    return loginAPI.register(name, email, password)
        .then((response) => {
            dispatch({type: REGISTER, apiToken: response.data.api_token})
        }, (error) => {
            dispatch({type: FAILURE, error: error})
        });
}

export const logoutActionCreator = () => (dispatch) => {
    return dispatch({type: LOGOUT})
}
