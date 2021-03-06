import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArticleItem from "./article-item";

import { getArticles } from "../../../api/articles";
import CircularLazyLoad from "../../../common/components/CircularLazyLoad";

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
        // maxWidth: 360,
        backgroundColor: "#fff",
        paddingBottom: 0,
    },
    item: {
        cursor: "pointer",
    },
    parent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
}));

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function DashboardMain() {
    const classes = useStyles();
    const history = useHistory();

    const handleRedirect = () => {
        history.push("/dashboard-articles-create");
    };

    return (
        <>
            <div className={classes.parent}>
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
                    <Typography color="textPrimary" className={classes.link}>
                        <GrainIcon className={classes.icon} />
                        Articles
                    </Typography>
                </Breadcrumbs>

                <Button
                    variant="outlined"
                    onClick={handleRedirect}
                    startIcon={<AddIcon />}
                    style={{
                        color: "#1c8a61",
                        borderColor: "#1c8a61",
                        fontWeight: "bold",
                    }}
                >
                    New Article
                </Button>
            </div>

            <br />
            <ArticlesList />
        </>
    );
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ArticlesList() {
    const classes = useStyles();
    const [articles, setArticles] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const { path } = useRouteMatch();

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    useEffect(async () => {
        try {
            const res = await getArticles();
            setArticles(res?.data?.data);
        } catch (err) {
            setSnackbarMessage("Error fetching articles");
            setSnackbarOpen(true);
        }
    }, []);

    const reload = async () => {
        setArticles(null);
        try {
            const res = await getArticles();
            setArticles(res?.data?.data);
        } catch (err) {
            setSnackbarMessage("Error fetching articles");
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            {articles !== null ? (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {articles &&
                            articles.length > 0 &&
                            articles.map((item, index) => {
                                return (
                                    <Grid item xs={6} key={index} id={item.id}>
                                        <ArticleItem
                                            data={item}
                                            reload={reload}
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100% - 100px)",
                    }}
                >
                    <CircularLazyLoad color="#1c8a61" />
                </Box>
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
