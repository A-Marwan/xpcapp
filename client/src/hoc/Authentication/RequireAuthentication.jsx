import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class Authentication extends Component {

        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/login');
            }
        }

        PropTypes = {
            router: PropTypes.object,
        }

        render() {
            return <div>
                <ComposedComponent {...this.props} />
            </div>;
        }
    }

    const mapStateToProps = (state) => {
        return {
            authenticated: state.login.loggedIn
        };
    };

    return connect(mapStateToProps)(Authentication);
}
