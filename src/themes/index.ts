import { createTheme } from "@mui/material";

/// Application Theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#0F2E72",
        },
        secondary: {
            main: "#62D5D6",
        },
        success: {
            main: "#50B91F"
        },
        info: {
            main: "#1F66B9"
        },
        error: {
            main: "#B9281F"
        },
        warning: {
            main: "#B9971F"
        },
        background: {
            default: "#BE3F54",
            paper: "#BE3F54",
        },
        text: {
            primary: "#061940",
            disabled: "#BDBDBD",
            secondary: "#000000",
        },

    },
    typography: {
        body1: {}
    },
    components: {
    }
});

export default theme;