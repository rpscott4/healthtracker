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
  Radio,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Link, Route } from "react-router-dom";
import { db } from "./firebase";

export default function Chart(props) {
  const [surveys, setSurveys] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .onSnapshot(snapshot => {
        const surveys = snapshot.docs.map(doc => {
          const survey = {
            sleep: doc.data().sleep,
            happiness: doc.data().happiness,
            date: new Date(doc.data().date.seconds * 1000),
            id: doc.id,
            study: doc.data().study,
            exercise: doc.data().exercise
          };
          return survey;
        });

        const sorted = surveys.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else {
            return -1;
          }
        });
        setSurveys(surveys);
      });
  }, []);

  useEffect(() => {
    //get and display labels
    const lbls = surveys.map(survey => {
      return moment(survey.date).format("M/D/YY");
    });
    setLabels(lbls);

    //creating holder for data sets
    const sets = [];

    //creating the sleep object
    const sleep = {
      label: "Hours of Sleep",
      data: surveys.map(s => s.sleep),
      borderColor: "red",
      borderWidth: 1
    };
    sets.push(sleep);

    //Creating happiness object
    const happiness = {
      label: "Happiness",
      data: surveys.map(s => s.happiness),
      borderColor: "blue",
      borderWidth: 1
    };
    sets.push(happiness);

    //Creating exercise object
    const exercise = {
      label: "Exercise",
      data: surveys.map(s => s.exercise),
      borderColor: "green",
      borderWidth: 1
    };
    sets.push(exercise);

    //Creating study object
    const study = {
      label: "Scripture Reading",
      data: surveys.map(s => s.study),
      borderColor: "yellow",
      borderWidth: 1
    };
    sets.push(study);

    //Set the state Variable
    setDataSets(sets);
  }, [surveys]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 500 }}
        >
          <Typography variant="h4">Chart</Typography>
          <Line
            data={{
              labels: labels,
              datasets: dataSets
            }}
          />
        </Paper>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper
          style={{ padding: 12, marginTop: 40, width: "100%", maxWidth: 500 }}
        >
          <Typography variant="h4">Survey Data</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Sleep</TableCell>
                  <TableCell align="right">Exercise</TableCell>
                  <TableCell align="right">Scripture</TableCell>
                  <TableCell align="right">Happiness</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {surveys.map(row => (
                  <TableRow>
                    <TableCell align="right">
                      {moment(row.date).format("M/D/YY")}
                    </TableCell>
                    <TableCell align="right">{row.sleep}</TableCell>
                    <TableCell align="right">{row.exercise}</TableCell>
                    <TableCell align="right">{row.study}</TableCell>
                    <TableCell align="right">{row.happiness}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}
