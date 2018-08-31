import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// core components
import { logout } from "../actions/Authentication/Logout.jsx";

class LogoutPage extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.logout();
    }

    render () {
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout(null)),
    };
};

export default connect(null, mapDispatchToProps)(LogoutPage);
