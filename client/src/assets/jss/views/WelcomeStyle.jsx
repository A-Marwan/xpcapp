import { successColor, defaultFont } from '../Main';

const welcomeStyle = {
    root: {
        flexGrow: 1,
        ...defaultFont,
    },
    campaignContainer: {
        lineHeight: "64px",
        marginTop: "20%",
        width: "100%",
    },
    campaignMessage: {
        fontWeight: 600,
        padding: 0,
        margin: 0,
        fontSize: "64px",
        textAlign: "center",
        textShadow: "0 0 12px rgba(0,0,0,0.5)",
        color: "#f2f2f2",
    },
    campaignSubMessage: {
        fontWeight: 400,
        padding: 0,
        margin: 0,
        fontSize: "32px",
        textAlign: "center",
        textShadow: "0 0 12px rgba(0,0,0,0.2)",
        color: successColor
    },

    "@media (max-width: 599px)": {
        campaignContainer: {
            lineHeight: "32px",
        },
        campaignMessage: {
            fontSize: "32px",
        },
        campaignSubMessage: {
            fontSize: "16px",
        }
    }
};

export default welcomeStyle;
