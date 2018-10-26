import React from "react";
import { FormattedMessage } from "react-intl";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import { AppBar } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";

import Button from "../Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

import UnauthenticatedBarStyle from "../../assets/jss/components/TopBar/UnauthenticatedBarStyle";

import logo from "../../assets/img/logo.png";
import {Link} from "react-router-dom";

class UnauthenticatedBar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar} position="static" color="default">
                <GridContainer className={classes.container}>
                    <GridItem className={classes.logo_container} component={Link} to={"/"} xs={12} sm={8}><img className={classes.logo} src={logo} alt={"#"}/><span className={classes.logo_text}>Chayaani</span><span className={classes.logo_text__dottn}>.tn</span></GridItem>
                    <GridItem xs={12} sm={4}>
                        <GridContainer className={classes.buttons_container}>
                            <GridItem xs={12} sm={5} component={Button} round variant="contained" color="success" className={classes.appBar_button__new_ride}><AddCircleOutline/><FormattedMessage id={"topBar.action.create_ride"}/></GridItem>
                            <GridItem xs={12} sm={3} component={Button} href={"/register"} simple variant="contained" color="info" link className={classes.appBar_button}><FormattedMessage id={"topBar.action.register"}/></GridItem>
                            <GridItem xs={12} sm={3} component={Button} href={"/login"} simple variant="contained" color="info" link className={classes.appBar_button}><FormattedMessage id={"topBar.action.login"}/></GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </AppBar>
        );
    }
}

export default withStyles(UnauthenticatedBarStyle)(UnauthenticatedBar);
