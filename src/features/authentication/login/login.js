import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Logo from "../../../assets/images/doctor-rahul-icon.svg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import firebase from "../../../firebase";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href={`${process.env.PUBLIC_URL}home.html`}>
                Doctor Rahul
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: "#e0e0e0",
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    logo: {
        height: 200,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: 0,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarError, setSnackbarError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignIn = (e) => {
        e.preventDefault();

        if (validateEmail() || validatePassword()) {
            setSnackbarOpen(true);
        } else {
            firebaseLogin();
        }
    };

    async function firebaseLogin() {
        try {
            setLoading(true);
            await firebase.login(email, password);
            // save user to storage
            localStorage.setItem("isLoggedIn", true);

            setSnackbarMessage("You Have Successfully Logged in");
            setSnackbarError(false);
            setSnackbarOpen(true);

            // redirect user
            setTimeout(() => {
                setLoading(false);
                history.push("/dashboard");
            }, 2000);
        } catch (error) {
            setSnackbarMessage(error?.message);
            setSnackbarError(true);
            setSnackbarOpen(true);
            setLoading(false);
        }
    }

    const validateEmail = () => {
        let error = false;

        if (email.length === 0) {
            error = true;
            setSnackbarMessage("Email cannot be empty");
            setSnackbarError(true);
        }

        return error;
    };

    const validatePassword = () => {
        let error = false;

        if (password.length === 0) {
            error = true;
            setSnackbarMessage("Password cannot be empty");
            setSnackbarError(true);
        }

        return error;
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    const reset = () => {
        setEmail("");
        setPassword("");
        setSnackbarError(false);
        setSnackbarMessage(null);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <Avatar className={classes.avatar} src={Logo} /> */}
                <img src={Logo} alt="logo" className={classes.logo} />
                <h2 className="logo-title">Doctor Rahul's Dashboard</h2>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSignIn}
                        disabled={loading}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarError ? "error" : "success"}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
