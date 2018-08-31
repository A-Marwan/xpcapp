import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Field, reduxForm} from "redux-form";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons
import { Email, LockOutlined } from "@material-ui/icons";
// core components
import Footer from "../components/Footer";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/Button";
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import CardHeader from "../components/Card/CardHeader";
import CardFooter from "../components/Card/CardFooter";
import Input from "../components/Input";
import { login } from "../actions/Authentication/Login.jsx";
import UnauthenticatedBar from "../components/TopBar/UnauthenticatedBar";

import {FormattedMessage} from "react-intl";

import loginStyle from "../assets/jss/views/LoginStyle";

class LoginPage extends React.Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loggedIn: PropTypes.string,
        login: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden"
        };
    }

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        if (!this.props.loggedIn) {
            setTimeout(
                function() {
                    this.setState({ cardAnimaton: "" });
                }.bind(this),
                100
            );
        }
    }

    renderField = (data) => {
        const isInvalid = data.meta.touched && !!data.meta.error;
        let error = false;

        if (isInvalid) {
            data.input["aria-invalid"] = true;
        }

        if (this.props.error && data.meta.touched && !data.meta.error) {
            error = true;
        }

        return <Input
            id={`login_${data.input.name}`}
            labelText={data.placeholder}
            formControlProps={{
                fullWidth: true
            }}
            labelProps={{
                required: data.required,
            }}
            inputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {data.input.name === "email" ? <Email className={this.props.classes.inputIconsColor} /> : <LockOutlined className={this.props.classes.inputIconsColor} />}
                    </InputAdornment>
                ),
                type: data.type,
                required: data.required,
                autoComplete: data.input.name,
                ...data.input,
            }}
            error={error}
        />;
    };

    render() {
        const { classes, handleSubmit } = this.props;

        return (
            <div>
                <UnauthenticatedBar/>
                <div className={classes.pageHeader}>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <Card className={classes[this.state.cardAnimaton]}>
                                    <CardHeader color="info" className={classes.cardHeader}>
                                        <h4><FormattedMessage id={"login.title"} /></h4>
                                    </CardHeader>
                                    <form onSubmit={handleSubmit(this.props.login)} className={classes.form}>
                                        <CardBody className={classes.cardBody}>
                                            <Field required component={this.renderField} name="email" type="email" placeholder={<FormattedMessage id={"login.form.label.email"} />} />
                                            <Field required component={this.renderField} name="password" type="password" placeholder={<FormattedMessage id={"login.form.label.password"} />} />
                                            {this.props.error &&
                                                <div className={classes.formError}>
                                                    {"Bad credentials" === this.props.error || "Unauthorized" === this.props.error ? <FormattedMessage id={"login.form.error.bad_credentials"}/> : <FormattedMessage id={"login.form.error.oups"}/>}
                                                </div>
                                            }
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            {this.props.loading ? <CircularProgress style={{ color: "#00acc1" }} /> :
                                                <div>
                                                    <Button round fullWidth color={"success"} type={"submit"}><FormattedMessage id={"login.action.login"} /></Button>
                                                    <div>Pas encore membre ? <a className={classes.registerLink} href={"/register"}>Inscrivez-vous</a></div>
                                                </div>
                                            }
                                        </CardFooter>
                                    </form>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </div>
                    <Footer whiteFont />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn,
        error: state.authentication.error,
        loading: state.authentication.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: values => dispatch(login(values)),
    };
};

export default reduxForm({form: "login", enableReinitialize: true, keepDirtyOnReinitialize: true})(connect(mapStateToProps, mapDispatchToProps)(withStyles(loginStyle)(LoginPage)));
