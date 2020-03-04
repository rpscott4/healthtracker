import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Radio
} from "@material-ui/core";
import VerySad from "@material-ui/icons/SentimentVeryDissatisfied";
import Sad from "@material-ui/icons/SentimentDissatisfied";
import Happy from "@material-ui/icons/SentimentSatisfied";
import VeryHappy from "@material-ui/icons/SentimentSatisfiedAlt";
import { Link, Route } from "react-router-dom";
import { db } from "./firebase";
import { functions } from "./firebase";

export default function Survey(props) {
  const [sleep, setSleep] = useState("");
  const [happiness, setHappiness] = useState(0);
  const [study, setStudy] = useState("");
  const [exercise, setExercise] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState(
    "Hey! Check out this health tracker app. https://healthtracker-8243e.firebaseapp.com"
  );

  const handleSave = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .add({
        sleep: sleep,
        happiness: happiness,
        date: new Date(),
        study: study,
        exercise: exercise
      })
      .then(() => {
        setSleep("");
        setHappiness(0);
        setStudy("");
        setExercise("");
      });
  };

  const handleSend = () => {
    const sendInvite = functions.httpsCallable("sendInvite");

    sendInvite({ number: number, message: message })
      .then(function(result) {})
      .then(() => {
        setNumber("");
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
        >
          <Typography variant="h4">Health Survey</Typography>
          <Typography style={{ marginTop: 16 }}>
            How many hours of sleep did you get last night?
          </Typography>
          <TextField
            fullWidth
            value={sleep}
            onChange={e => setSleep(e.target.value)}
            type="number"
          />
          <Typography style={{ marginTop: 16 }}>
            Hours of scripture study?
          </Typography>
          <TextField
            fullWidth
            value={study}
            onChange={e => setStudy(e.target.value)}
            type="number"
          />
          <Typography style={{ marginTop: 16 }}>
            Exercise, in minutes
          </Typography>
          <TextField
            fullWidth
            value={exercise}
            onChange={e => setExercise(e.target.value)}
            type="number"
          />
          <Typography style={{ marginTop: 16 }}>
            How happy do you feel today?
          </Typography>
          <div style={{ display: "flex" }}>
            <Radio
              checked={happiness === 1}
              checkedIcon={<VerySad />}
              icon={<VerySad />}
              onChange={() => setHappiness(1)}
            />
            <Radio
              checked={happiness === 2}
              checkedIcon={<Sad />}
              icon={<Sad />}
              onChange={() => setHappiness(2)}
            />
            <Radio
              checked={happiness === 3}
              checkedIcon={<Happy />}
              icon={<Happy />}
              onChange={() => setHappiness(3)}
            />
            <Radio
              checked={happiness === 4}
              checkedIcon={<VeryHappy />}
              icon={<VeryHappy />}
              onChange={() => setHappiness(4)}
            />
          </div>
          <Button
            onClick={handleSave}
            style={{ marginTop: 16 }}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Paper>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          style={{ padding: 12, marginTop: 70, width: "100%", maxWidth: 400 }}
        >
          <Typography variant="h6">Invite User to App</Typography>
          <Typography style={{ marginTop: 16 }}>Phone Number</Typography>
          <TextField
            fullWidth
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <Typography style={{ marginTop: 16 }}>Message</Typography>
          <TextField
            fullWidth
            multiline
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            onClick={handleSend}
            style={{ marginTop: 16 }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </Paper>
      </div>
    </div>
  );
}
