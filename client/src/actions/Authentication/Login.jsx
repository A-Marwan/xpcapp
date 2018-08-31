import {SubmissionError} from "redux-form";
import fetch from "../../utils/fetch";

export function error(error) {
    return {type: "LOGIN_ERROR", error};
}

export function loading(loading) {
    return {type: "LOGIN_LOADING", loading};
}

export function loggedIn(loggedIn) {
    return {type: "LOGIN_SUCCESS", loggedIn};
}

export function login(values) {
    return (dispatch) => {
        dispatch(loading(true));

        return fetch("/login_check", {method: "POST", body: JSON.stringify(values)})
            .then(response => {
                dispatch(loading(false));

                return response.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);
                dispatch(loggedIn(data));
            })
            .catch(e => {
                dispatch(loading(false));

                if (e instanceof SubmissionError) {
                    dispatch(error(e.errors._error));
                    throw e;
                }

                dispatch(error(e.message));
            });
    };
}