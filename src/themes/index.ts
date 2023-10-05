
import type { } from '@mui/x-data-grid/themeAugmentation';
import { createTheme } from "@mui/material";
import Colors from "./colors";

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
            paper: "#FFFFFF",
        },
        text: {
            primary: "#061940",
            disabled: "#BDBDBD",
            secondary: "#000000",
        },

    },
    typography: {
        body1: {
            color: Colors.primaryDark,
            fontSize: 16,
            fontWeight: "normal",
        },
        button: {
            color: "white",
            fontWeight: "bold",
            fontSize: 15,
            textTransform: "none",
        },
        subtitle1: {
            color: Colors.secodaryDark,
            fontSize: 17,
            fontWeight: "bold"
        },
        subtitle2: {
            color: "black",
            fontSize: 17,
            fontWeight: "normal"
        },
        h1: {
            color: Colors.primaryDark,
            fontSize: 50,
            fontWeight: "bold"
        },
        h2: {
            color: "black",
            fontSize: 35,
            fontWeight: "normal"
        },
        h3: {
            color: Colors.primaryDark,
            fontSize: 30,
            fontWeight: "normal"
        }
    },
    components: {
        // AppBar Theme
        MuiAppBar: {
            defaultProps: {
                position: "sticky",
                elevation: 3.0,
            }
        },

        // Toolbar Theme
        MuiToolbar: {
            defaultProps: {
                disableGutters: true,
                sx: {
                    paddingX: 10,
                    paddingTop: 3,
                    paddingBottom: 1,
                    backgroundColor: 'white',
                }
            }
        },

        /// Container Theme
        MuiContainer: {
            defaultProps: {
                sx: {
                    backgroundColor: 'white'
                }
            }
        },

        // Link Theme
        MuiLink: {
            defaultProps: {
                sx: {
                    textDecoration: "none",
                }
            }
        },

        /// Button Theme
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableFocusRipple: true,
                disableRipple: true,
                disableTouchRipple: true,
            }
        },

        MuiDataGrid: {

            styleOverrides: {
                root: {
                    backgroundColor: "white",
                    color: "black",
                },
                columnHeader: {
                    backgroundColor: "#F2F4F9",
                },

            },
        }

    }
});

export default theme;