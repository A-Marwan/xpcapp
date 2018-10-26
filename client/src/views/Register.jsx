import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { Slide, Stepper, Step, StepButton, StepLabel, FormControl, FormControlLabel, RadioGroup, Radio } from "@material-ui/core";

// @material-ui/icons
import { NavigateNext } from "@material-ui/icons";

// core components
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/Button";
import Input from "../components/Input";
import { register, checkEmail, checkUsername, error } from "../actions/Authentication/Register.jsx";
import UnauthenticatedBar from "../components/TopBar/UnauthenticatedBar";

import {FormattedMessage} from "react-intl";

import registerStyle from "../assets/jss/views/RegisterStyle";

class RegisterPage extends React.Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        register: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            completed: {},
            direction: "left",
            errors: {},
        };
    }

    renderField = (data) => {
        const isInvalid = data.meta.touched && !!data.meta.error;
        let error = false;

        if (isInvalid) {
            data.input["aria-invalid"] = true;
        }

        if (this.props.error && data.meta.touched && !data.meta.error) {
            error = this.props.error;
        }

        return <Input
            id={`register_${data.input.name}`}
            labelText={data.placeholder}
            formControlProps={{
                fullWidth: true
            }}
            labelProps={{
                required: data.required,
            }}
            inputProps={{
                type: data.type,
                required: data.required,
                autoComplete: data.input.name,
                ...data.input,
            }}
            error={error === data.input.name || error === data.input.name + "_error_impossible_age" || error === data.input.name + "_error_min_age"}
        />;
    };

    handleChange = event => {
        this.setState({
            gender: event.target.value,
        });

        this.props.change('gender', event.target.value);
    };

    renderSelect = () => {
        return (
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}
                >
                    <FormControlLabel value="male" control={<Radio style={{ color: "#5DD167" }} />} label={<FormattedMessage id={"register.form.label.gender_male"} />} />
                    <FormControlLabel value="female" control={<Radio style={{ color: "#5DD167" }} />} label={<FormattedMessage id={"register.form.label.gender_female"} />} />
                </RadioGroup>
            </FormControl>
        )
    };

    getSteps = () => {
        return ["email", "fullname", "birthDate", "gender", "password"];
    };

    totalSteps = () => {
        return this.getSteps().length;
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It"s the last step, but not all steps have been completed,
            // find the first step that has been completed
            const steps = this.getSteps();
            activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleStep = step => () => {
        const { activeStep } = this.state;

        if (activeStep > step) {
            this.handleDirection("right")
        } else {
            this.handleDirection("left")
        }

        this.setState({
            activeStep: step,
        });
    };

    handleDirection = direction => {
        this.setState({
            direction: direction,
        });
    };

    handleComplete = () => {
        const { completed } = this.state;

        completed[this.state.activeStep] = true;
        this.setState({
            completed,
        });
        this.setState({
            direction: "left",
        });
        this.handleNext();
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: {},
        });
    };

    completedSteps() {
        return Object.keys(this.state.completed).length;
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps();
    }

    getStepContent = (step, classes) => {

        switch (step) {
            case 0:
                return (
                    <Slide key={step} className={classes.field} in direction={this.state.direction}>
                        <div>
                            <h2><FormattedMessage id={"register.title.email"}/></h2>
                            <Field required component={this.renderField} name="email" type="email" placeholder={<FormattedMessage id={"register.form.label.email"} />} />
                            {(this.props.error === "email")
                            && <div className={classes.error}><FormattedMessage id={"register.form.error.email_exist"}/></div>
                            }
                            <Button type={"submit"} round color={"info"}><FormattedMessage id={"register.action.next_step"} /><NavigateNext /></Button>
                            <button className={classes.hidden} id={"next-step"} data-step={0} onClick={this.handleComplete}/>
                        </div>
                    </Slide>
                );
            case 1:
                return (
                    <Slide key={step} className={classes.field} in direction={this.state.direction}>
                        <div>
                            <h2><FormattedMessage id={"register.title.fullname"}/></h2>
                            <Field required component={this.renderField} name="username" type="text" placeholder={<FormattedMessage id={"register.form.label.username"} />} />
                            {this.props.error === "username" && <div className={classes.error}><FormattedMessage id={"register.form.error.username_exist"}/></div>}
                            <Field required component={this.renderField} name="lastname" type="text" placeholder={<FormattedMessage id={"register.form.label.lastname"} />} />
                            <Field required component={this.renderField} name="firstname" type="text" placeholder={<FormattedMessage id={"register.form.label.firstname"} />} />
                            <Button type={"submit"} round color={"info"}><FormattedMessage id={"register.action.next_step"} /><NavigateNext /></Button>
                            <button className={classes.hidden} id={"next-step"} data-step={1} onClick={this.handleComplete}/>
                        </div>
                    </Slide>
                );
            case 2:
                return (
                    <Slide key={step} className={classes.field} in direction={this.state.direction}>
                        <div>
                            <h2><FormattedMessage id={"register.title.birthDate"}/></h2>
                            <Field required component={this.renderField} name="birthDate" type="number" placeholder={<FormattedMessage id={"register.form.label.birthDate"} />} />
                            {(this.props.error === "birthDate_error_min_age" || this.props.error === "birthDate_error_impossible_age")
                                && <div className={classes.error}><FormattedMessage id={"register.form.error." + this.props.error}/></div>
                            }
                            <Button type={"submit"} round color={"info"}><FormattedMessage id={"register.action.next_step"} /><NavigateNext /></Button>
                            <button className={classes.hidden} id={"next-step"} data-step={2} onClick={this.handleComplete}/>
                        </div>
                    </Slide>
                );
            case 3:
                return (
                    <Slide key={step} className={classes.field} in direction={this.state.direction}>
                        <div>
                            <h2><FormattedMessage id={"register.title.gender"}/></h2>
                            <span className={classes.hidden}><Field required component={this.renderField} name="gender" type="text" /></span>
                            <Field name={"gender"} required component={this.renderSelect} placeholder={<FormattedMessage id={"register.form.label.birthDate"} />} />
                            <div>
                                <Button type={"submit"} round color={"info"}><FormattedMessage id={"register.action.next_step"} /><NavigateNext /></Button>
                                <button className={classes.hidden} id={"next-step"} data-step={3} onClick={this.handleComplete}/>
                            </div>
                        </div>
                    </Slide>
                );
            case 4:
                return (
                    <Slide key={step} className={classes.field} in direction={this.state.direction}>
                        <div>
                            <h2><FormattedMessage id={"register.title.password"}/></h2>
                            <Field required component={this.renderField} name="plainPassword" type="password" placeholder={<FormattedMessage id={"register.form.label.password"} />} />
                            <Button round color={"success"} type={"submit"}><FormattedMessage id={"register.action.finish"} /></Button>
                        </div>
                    </Slide>
                );
            default:
                return "Unknown step";
        }
    }
    render() {
        const { classes, handleSubmit } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <div>
                <UnauthenticatedBar/>
                <div className={classes.pageHeader}>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                                <form onSubmit={handleSubmit(this.props.register)} className={classes.form}>
                                    <Stepper classes={{ root: classes.stepper }} nonLinear activeStep={activeStep}>
                                        {steps.map((label, index) => {
                                            return (
                                                <Step key={label}>
                                                    <StepButton className={classes.stepButton}
                                                        id={`register_step_${index}`}
                                                        onClick={this.handleStep(index)}
                                                        completed={this.state.completed[index]}
                                                        disabled={index > this.completedSteps()}
                                                    >
                                                        <StepLabel className={classes.stepLabel} StepIconProps={{ classes: { active: classes.stepIconActive, completed: classes.stepIconCompleted } }}/>
                                                    </StepButton>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    <div>
                                        <span>{this.getStepContent(activeStep, classes)}</span>
                                        <div>
                                        </div>
                                    </div>
                                </form>
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.register.error,
        loading: state.register.loading,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        register: (values) => {
            const nextStep = document.getElementById("next-step");
            let currentStep = null;

            if (nextStep !== null) {
                currentStep = nextStep.getAttribute("data-step");
            }

            if (nextStep === null) {
                dispatch(register(values));
                return props.history.push("/login");
            }

            let errors = "";

            if ("0" === currentStep) {
                dispatch(checkEmail(values));
            } else if ("1" === currentStep) {
                dispatch(checkUsername(values));
            } else {
                if (values.birthDate !== undefined && "2" === currentStep) {
                    const currentYear = (new Date()).getFullYear();

                    if (values.birthDate <= currentYear && currentYear - 18 < values.birthDate) {
                        dispatch(error("birthDate_error_min_age"));
                        errors = "birthDate_error_min_age";
                    } else if (values.birthDate > currentYear || values.birthDate < currentYear - 100) {
                        dispatch(error("birthDate_error_impossible_age"));
                        errors = "birthDate_error_impossible_age";
                    }
                }

                if (errors === "birthDate_error_impossible_age" || errors === "birthDate_error_min_age") {
                    document.getElementById("register_step_2").click();
                    setTimeout(
                        function() {
                            document.getElementById("register_birthDate").focus();
                        }, 300
                    );
                    return null;
                }

                dispatch(error(errors));

                if (errors === "") {
                    document.getElementById("next-step").click();
                }

            }
        },
    };
};

export default reduxForm({form: "register", enableReinitialize: true, keepDirtyOnReinitialize: true})(connect(mapStateToProps, mapDispatchToProps, this.props)(withStyles(registerStyle)(RegisterPage)));
