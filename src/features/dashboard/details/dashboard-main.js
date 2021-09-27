import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Person";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import UnderConstruction from "../../../assets/images/under_construction.svg";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ArticleItem from "./article-item";

import { getArticles } from "../../../api/articles";

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
}));

function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
}

export default function DashboardMain() {
    const classes = useStyles();
    const history = useHistory();

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
                <Typography color="textPrimary" className={classes.link}>
                    <GrainIcon className={classes.icon} />
                    Articles
                </Typography>
            </Breadcrumbs>

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

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {articles &&
                        articles.length > 0 &&
                        articles.map((item, index) => {
                            return (
                                <Grid item xs={6} key={index} id={item.id}>
                                    <ArticleItem data={item} />
                                </Grid>
                            );
                        })}
                </Grid>
            </Box>

            {/* <List className={classes.root}>
                {articles &&
                    articles.length > 0 &&
                    articles
                        .sort((a, b) => {
                            // sort based on score - D.O
                            if (a.score > b.score) {
                                return -1;
                            }
                            if (a.score < b.score) {
                                return 1;
                            }
                            return 0;
                        })

                        .sort((a, b) => {
                            // sort based on name - A.O
                            if (a.userName > b.userName) {
                                return 1;
                            }
                            if (a.userName < b.userName) {
                                return -1;
                            }
                            return 0;
                        })

                        .map((item, index) => {
                            return (
                                <>
                                    <Link
                                        href={`${path}/articles/${item?.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <ListItem
                                            className={classes.item}
                                            key={index}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item?.title}
                                                secondary={item?.description}
                                            />
                                        </ListItem>
                                        {index < articles.length - 1 && (
                                            <Divider />
                                        )}
                                    </Link>
                                </>
                            );
                        })}

                {articles && articles.length === 0 && (
                    <>
                        <ListItem className={classes.item}>
                            <ListItemAvatar>
                                <Avatar>
                                    <BrokenImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="No articles found" />
                        </ListItem>
                    </>
                )}

                <div className="under-construction">
                <img src={UnderConstruction} alt="under-construction" />
                <p>Under Construction</p>
            </div>

                
            </List> */}

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
