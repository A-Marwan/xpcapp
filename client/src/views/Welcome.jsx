import React from "react";
import { FormattedMessage } from "react-intl";
import {connect} from "react-redux";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

import Parallax from "../components/Parallax";
import UnauthenticatedBar from "../components/TopBar/UnauthenticatedBar";
import AuthenticatedBar from "../components/TopBar/AuthenticatedBar";

import welcomeStyle from "../assets/jss/views/WelcomeStyle";

class Welcome extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.props.loggedIn ? <AuthenticatedBar/> : <UnauthenticatedBar/>}
                <Parallax image={require("../assets/img/launch_campaign_2018_2.jpg")}>
                    <div className={classes.campaignContainer}>
                        <div className={classes.campaignMessage}><FormattedMessage id={"welcome.info.campaign.message"}/></div>
                        <div className={classes.campaignSubMessage}><FormattedMessage id={"welcome.info.campaign.sub_message"}/></div>
                        <div>

                        </div>
                    </div>
                </Parallax>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn,
    };
};

export default connect(mapStateToProps)(withStyles(welcomeStyle)(Welcome));
