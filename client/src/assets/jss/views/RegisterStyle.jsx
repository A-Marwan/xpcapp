import {container, defaultFont, dangerColor, successColor, infoColor, darkGrayColor} from "../Main";

const registerPageStyle = {
    container: {
        ...container,
        ...defaultFont,
        zIndex: "2",
        position: "relative",
        color: "#FFFFFF"
    },
    pageHeader: {
        minHeight: "50vh",
        maxHeight: "1200px",
        height: "auto",
        display: "inherit",
        position: "relative",
        marginTop: "10vh",
        margin: "0",
        padding: "0",
        border: "0",
        alignItems: "center",
        "&:before": {
            background: "#FFFFFF",
        },
        "& footer li a,& footer li a:hover,& footer li a:active": {
            color: "#FFFFFF"
        },
        "& footer": {
            position: "absolute",
            bottom: "0",
            width: "100%",
        }
    },
    stepper: {
        backgroundColor: "transparent",
        marginBottom: "10vh",
    },
    stepButton: {
        margin: "0px",
        padding: "0px",
    },
    stepLabel: {
        "& span": {
            paddingRight: "0px",
        }
    },
    stepIconActive: {
        color: infoColor + "!important",
    },
    stepIconCompleted: {
        color: successColor + "!important",
    },
    form: {
        margin: "0",
        textAlign: "center",
    },
    field: {
        color: darkGrayColor,
    },
    fieldHidden: {
        display: "none",
    },
    formError: {
        textAlign: "center",
        color: dangerColor,
    },
    cardHeader: {
        width: "auto",
        textAlign: "center",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "-40px",
        padding: "0",
        marginBottom: "15px",
        fontSize: "20px",
    },
    cardFooter: {
        color: "#AAAAAA ",
        paddingTop: "0rem",
        border: "0",
        borderRadius: "6px",
        justifyContent: "center !important"
    },
    registerLink: {
        color: infoColor,
        fontWeight: "bold",
        textDecoration: "none",
    },
    socialLine: {
        marginTop: "1rem",
        textAlign: "center",
        padding: "0"
    },
    inputIconsColor: {
        color: darkGrayColor,
    },
    hidden: {
        display: "none",
    },
    error: {
        color: dangerColor,
        textAlign: "left",
    },
    "@media (max-width: 599px)": {
        pageHeader: {
            marginTop: "10vh",
        },
    }
};

export default registerPageStyle;
