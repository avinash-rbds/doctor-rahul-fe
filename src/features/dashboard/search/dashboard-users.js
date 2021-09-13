import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import GrainIcon from "@material-ui/icons/Grain";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getUserDetails } from "../../../api/users";
import { updatePoints } from "../../../api/points";

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

export default function DashboardUsers() {
  const classes = useStyles();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { id } = useParams();

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
          href="/dashboard/users"
          onClick={() => {
            history.push("/dashboard/users");
          }}
          className={classes.link}
        >
          <GrainIcon className={classes.icon} />
          Users
        </Link>
        <Typography color="textPrimary" className={classes.link}>
          {id}
        </Typography>
      </Breadcrumbs>

      <br />
      <UserDetails />
    </>
  );
}

function UserDetails() {
  const classes = useStyles();
  const { id } = useParams();

  const [openAddPoints, setOpenAddPoints] = useState(false);
  const [openRemovePoints, setOpenRemovePoints] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarError, setSnackbarError] = useState(false);
  const [points, setPoints] = useState("");
  const [currentUser, setCurrentUser] = useState({ dId: id });

  useEffect(async () => {
    try {
      const res = await getUserDetails(id);
      setCurrentUser({
        score: res?.data?.user?.score,
        userName: res?.data?.user?.userName,
        ...currentUser,
      });
    } catch (err) {
      console.log("#", err);
      setSnackbarMessage(`Error fetching details for ${id}`);
      setSnackbarError(true);
      setSnackbarOpen(true);
    }
  }, []);

  const handleOpenAddPoints = () => {
    setOpenAddPoints(true);
  };
  const handleCloseAddPoints = () => {
    setOpenAddPoints(false);
    setSnackbarError(false);
    setSnackbarMessage(null);
    setPoints("");
  };

  const handleOpenRemovePoints = () => {
    setOpenRemovePoints(true);
  };
  const handleCloseRemovePoints = () => {
    setOpenRemovePoints(false);
    setSnackbarError(false);
    setSnackbarMessage(null);
    setPoints("");
  };

  const handleSaveAddPoints = async (e) => {
    e.preventDefault();

    if (isValidationError()) {
      setSnackbarOpen(true);
    } else {
      // API
      try {
        const res = await updatePoints({
          action: "ADD",
          dId: currentUser?.dId,
          score: points,
        });
        window.location.reload();
      } catch (err) {
        setSnackbarError(true);
        setSnackbarOpen(true);
        setSnackbarMessage("Error adding points");
      }
    }
  };

  const handleSaveRemovePoints = async (e) => {
    e.preventDefault();

    if (isValidationError()) {
      setSnackbarError(true);
      setSnackbarOpen(true);
    } else {
      // API
      try {
        const res = await updatePoints({
          action: null,
          dId: currentUser?.dId,
          score: points,
        });
        window.location.reload();
      } catch (err) {
        setSnackbarError(true);
        setSnackbarOpen(true);
        setSnackbarMessage("Error removing points");
      }
    }
  };

  const isValidationError = () => {
    const pattern = /^\d+$/;
    let error = false;

    if (points.length === 0) {
      error = true;
      setSnackbarMessage("Points cannot be empty");
      setSnackbarError(true);
    }

    if (points < 0) {
      error = true;
      setSnackbarMessage("Points cannot be negative");
      setSnackbarError(true);
    }

    if (!pattern.test(points)) {
      error = true;
      setSnackbarMessage("Points cannot have a special character");
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

  const addPoints = (
    <div className={classes.modal}>
      <h2 id="simple-modal-title">Add points</h2>

      <div className="score" style={{ margin: `48px 0 32px 0` }}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          style={{ width: `100%`, maxWidth: `100%` }}
        >
          <TextField
            type="number"
            id="outlined-basic"
            label="Score"
            variant="outlined"
            onChange={(e) => setPoints(e.target.value)}
          />
        </form>
      </div>
      <br />

      <div className="score" style={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCloseAddPoints}
          style={{ marginRight: 16 }}
        >
          CANCEL
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSaveAddPoints}
        >
          SAVE
        </Button>
      </div>
    </div>
  );

  const removePoints = (
    <div className={classes.modal}>
      <h2 id="simple-modal-title">Remove points</h2>

      <div className="score" style={{ margin: `48px 0 32px 0` }}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          style={{ width: `100%`, maxWidth: `100%` }}
        >
          <TextField
            type="number"
            id="outlined-basic"
            label="Score"
            variant="outlined"
            onChange={(e) => setPoints(e.target.value)}
          />
        </form>
      </div>
      <br />

      <div className="score" style={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCloseRemovePoints}
          style={{ marginRight: 16 }}
        >
          CANCEL
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSaveRemovePoints}
        >
          SAVE
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent className={classes.media}>
            <div className="score">
              <Typography variant="h3" component="h2">
                {currentUser?.score !== undefined ? currentUser?.score : "N/A"}
              </Typography>
            </div>
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {currentUser?.userName !== undefined
                ? currentUser?.userName
                : "N/A"}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              #{currentUser?.dId}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            className={classes.remove}
            onClick={setOpenRemovePoints}
          >
            REMOVE
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.add}
            onClick={setOpenAddPoints}
          >
            ADD
          </Button>
        </CardActions>
      </Card>

      <Modal
        disableBackdropClick
        open={openAddPoints}
        onClose={handleCloseAddPoints}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {addPoints}
      </Modal>

      <Modal
        disableBackdropClick
        open={openRemovePoints}
        onClose={handleCloseRemovePoints}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {removePoints}
      </Modal>

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
