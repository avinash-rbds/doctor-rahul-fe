import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ArticleItem from "./article-list-item";

import { getArticles } from "../../api/articles";
import CircularLazyLoad from "../../common/components/CircularLazyLoad";

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
        <div
            className="app"
            style={{ backgroundColor: "#f5f5f5", maxWidth: `100%` }}
        >
            <div style={{ textAlign: "center" }}>
                <h3>Articles</h3>
            </div>
            {articles !== null ? (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={2}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        {articles &&
                            articles.length > 0 &&
                            articles.map((item, index) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        key={index}
                                        id={item.id}
                                        style={{ maxWidth: 900 }}
                                    >
                                        <ArticleItem
                                            data={item}
                                            reload={reload}
                                            mode="read"
                                        />
                                    </Grid>
                                );
                            })}
                    </Grid>
                </Box>
            ) : (
                <div className="article-loader">
                    <CircularLazyLoad color="#1c8a61" />
                </div>
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
        </div>
    );
}
