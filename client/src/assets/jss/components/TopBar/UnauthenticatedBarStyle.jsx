import {defaultFont, infoColor, successColor} from "../../Main";

const UnauthenticatedBarStyle = {
    appBar: {
        ...defaultFont,
        backgroundColor: "#FFFFFF",
    },
    appBar_button: {
        fontWeight: "bold",
        "&:hover": {
            color: '#FFF',
        }
    },
    container: {
        maxWidth: "100%",
        marginLeft: "0",
    },
    logo_container: {
        display: "flex",
        textDecoration: "none",
    },
    logo: {
        maxWidth: "48px",
        maxHeight: "48px",
        paddingLeft: "5px",
        paddingTop: "6px",
    },
    logo_text: {
        color: successColor,
        fontWeight: "bold",
        paddingTop: "16px",
        paddingLeft: "4px",
    },
    logo_text__dottn: {
        color: infoColor,
        paddingTop: "16px",
    },

    "@media (max-width: 599px)": {
        appBar_button__new_ride: {
            margin: "5px 20px",
        },
        logo_container: {
            justifyContent: "center",
            paddingTop: "2vh",
            paddingBottom: "2vh",
        },
        buttons_container: {
            justifyContent: "center",
        },
    }
};

export default UnauthenticatedBarStyle;
