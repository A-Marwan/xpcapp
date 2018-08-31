export function loggedIn(loggedIn) {
    return {type: "LOGOUT_SUCCESS", loggedIn};
}

export function logout(value) {
    return (dispatch) => {
        localStorage.clear();
        dispatch(loggedIn(value));
    };
}