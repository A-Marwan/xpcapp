import {container, defaultFont, dangerColor, infoColor} from "../Main";

const loginPageStyle = {
    container: {
        ...container,
        ...defaultFont,
        zIndex: "2",
        position: "relative",
        color: "#FFFFFF"
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(0, -60px, 0)"
    },
    pageHeader: {
        minHeight: "100vh",
        maxHeight: "1200px",
        height: "auto",
        display: "inherit",
        position: "relative",
        marginTop: "20vh",
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
    form: {
        margin: "0"
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
        color: "#495057"
    },

    "@media (max-width: 599px)": {
        pageHeader: {
            marginTop: "10vh",
        },
    }
};

export default loginPageStyle;
