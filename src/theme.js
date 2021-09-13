import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#29ca8e",
        },
        secondary: {
            main: "#2f1007",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
});

export default theme;
