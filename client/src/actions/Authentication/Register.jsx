import {SubmissionError} from "redux-form";
import fetch from "../../utils/fetch";
import axios from "axios/index";

export function error(error) {
    return {type: "REGISTER_ERROR", error};
}

export function loading(loading) {
    return {type: "REGISTER_LOADING", loading};
}

export function success(registered) {
    return {type: "REGISTER_SUCCESS", registered};
}

export function register(values) {
    return (dispatch) => {
        dispatch(loading(true));
        values["fullname"] = values["firstname"] + " " + values["lastname"];

        return fetch("/users", {method: "POST", body: JSON.stringify(values)})
            .then(response => {
                dispatch(loading(false));

                return response.json();
            })
            .then(data => {
                dispatch(success(data));
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

export function checkEmail(values) {
    return async (dispatch) => {
        dispatch(loading(true));
        dispatch(error(null));

        await axios.get(process.env.REACT_APP_API_ENTRYPOINT + "/register/check_email", {
            params: {
                email: values.email
            }
        }).then(response => {
            dispatch(loading(false));

            if (response.data.exist) {
                dispatch(error("email"));
                document.getElementById("register_email").focus();
            } else {
                document.getElementById("next-step").click();
            }
        })
    }
}

export function checkUsername(values) {
    return async (dispatch) => {
        dispatch(loading(true));
        dispatch(error(null));

        await axios.get(process.env.REACT_APP_API_ENTRYPOINT + "/register/check_username", {
            params: {
                username: values.username
            }
        }).then(response => {
            dispatch(loading(false));

            if (response.data.exist) {
                dispatch(error("username"));
                document.getElementById("register_username").focus();
            } else {
                document.getElementById("next-step").click();
            }
        })
    }
}