import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { alpha } from "@mui/material/styles";
import moment from "moment";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { calcuteTimeForFeedFromNow } from "../../../utils/functions";
import DummyImage from "../../../assets/images/dummy-image.svg";

import { getArticleById } from "../../../api/articles";
import ArticleMediumEdit from "./article-medium-edit";

const useStyles = makeStyles((theme) => ({
    link: {
        display: "flex",
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    root: {
        width: "100%",
        maxWidth: 400,
        backgroundColor: "#fff",
        paddingBottom: 0,
    },
    item: {
        cursor: "pointer",
    },
    media: {
        height: 140,
        backgroundColor: "#dcdcdc",
    },
    remove: {
        backgroundColor: red[500],
        color: "#FFF",
    },
    add: {
        backgroundColor: green[500],
        color: "#FFF",
    },
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ArticleCreate() {
    const classes = useStyles();
    const history = useHistory();
    const { path } = useRouteMatch();

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    color="inherit"
                    href="/dashboard"
                    onClick={() => {
                        history.push("/dashboard");
                    }}
                    className={classes.link}
                >
                    <HomeIcon className={classes.icon} />
                    Dashboard
                </Link>
                <Link
                    color="inherit"
                    href="/dashboard"
                    onClick={() => {
                        history.push("/dashboard");
                    }}
                    className={classes.link}
                >
                    <GrainIcon className={classes.icon} />
                    Articles
                </Link>
                <Typography color="textPrimary" className={classes.link}>
                    New
                </Typography>
            </Breadcrumbs>

            <br />
            <ArticleCreateView />
        </>
    );
}

function ArticleCreateView() {
    const classes = useStyles();
    const { id } = useParams();

    const [openAddPoints, setOpenAddPoints] = useState(false);
    const [openRemovePoints, setOpenRemovePoints] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [snackbarError, setSnackbarError] = useState(false);
    const [points, setPoints] = useState("");
    const [currentArticle, setCurrentArticle] = useState(null);

    useEffect(async () => {
        try {
            const res = await getArticleById(id);
            setCurrentArticle(res?.data?.data);
        } catch (err) {
            setSnackbarMessage(`Error fetching article details`);
        }
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <>
            <ArticleMediumEdit data={null} mode="create" />

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
        </>
    );
}
