import { successColor, defaultFont } from '../Main';

const welcomeStyle = {
    root: {
        flexGrow: 1,
        ...defaultFont,
    },
    campaignContainer: {
        lineHeight: "48px",
        marginTop: "20%",
        width: "100%",
    },
    campaignMessage: {
        fontWeight: 300,
        padding: 0,
        margin: 0,
        fontSize: "48px",
        textAlign: "center",
        textShadow: "0 0 12px rgba(0,0,0,0.5)",
        color: "#f2f2f2",
    },
    campaignSubMessage: {
        fontWeight: 300,
        padding: 0,
        margin: 0,
        fontSize: "24px",
        textAlign: "center",
        textShadow: "0 0 12px rgba(0,0,0,0.2)",
        color: successColor,
    },
};

export default welcomeStyle;
