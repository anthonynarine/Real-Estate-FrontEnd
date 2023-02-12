import { useImmerReducer } from "use-immer";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//icons
import { AddCircleSharp } from "@mui/icons-material";
import { Container } from "@mui/system";

import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// ALL IMPORTS GO ABOVE THIS LINE \\

//  MAIN FUNCTION START \\
function Test() {
  //Test FORM STYLE START\\
  const paperStyle = {
    padding: "30px 20px",
    width: 400,
    margin: "60px auto",
  };
  const headerStyle = {
    margin: 0,
  };
  const avatarStyle = {
    backgroundColor: "#79B2BE",
  };
  const TestBtn = {
    backgroundColor: "#79B2BE",
    color: "white",
    width: "15rem",
    fontSize: "1rem",
    marginLeft: "5rem",
  };
  //Test FORM STYLE END\\

  const navigate = useNavigate();

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    nameValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        break;
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        break;
      case "catchNameChange":
        draft.nameValue = action.nameChosen;
        break;

        // case "catchPasswordChange":
        //     draft.passwordValue = action.passwordChosen;
        //     break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  //FORM SUBMIT HANDLE FUNCTIONALITY START\\
  function FormSubmitHandler(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
    //onSubmit sendRequst changes to the opposite of what it courrently is
  }
  //FORM SUBMIT HANDLE FUNCTIONALITY END\\

  return (
    <Container>
      <Grid justifyContent="center">
        <Paper elevation={19} sx={paperStyle}>
          <Grid align="center" marginTop="rem">
            <Avatar sx={avatarStyle}>
              <AddCircleSharp />
            </Avatar>
            <h1 sx={headerStyle}>Add Property</h1>
          </Grid>
          <form onSubmit={FormSubmitHandler}>
            <TextField
              margin="normal"
              id="name"
              label="name"
              variant="outlined"
              fullWidth
              placeholder="Enter your title"
              // the value prop will catch the values from the form field this must be taken from state
              value={state.nameValue}
              onChange={(e) =>
                dispatch({
                  type: "catchNameChange",
                  nameChosen: e.target.value,
                })
              }
              //here dispatch will collect the user input and store it's value in the titleChosen variable with this event handler.
            />
            <TextField
              margin="normal"
              id="email"
              label="Email "
              variant="outlined"
              fullWidth
              placeholder="E-mail Address"
              value={state.emailValue}
              onChange={(e) =>
                dispatch({
                  type: "catchEmailChange",
                  emailChosen: e.target.value,
                })
              }
            />
            <TextField
              type="password"
              margin="normal"
              id="password"
              label="Password "
              variant="outlined"
              fullWidth
              placeholder="Enter Pasword"
              value={state.passwordValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPasswordChange",
                  passwordChosen: e.target.value,
                })
              }
            />
            <TextField
              type="password"
              margin="normal"
              id="password2"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              placeholder="Confirm Password"
              value={state.password2Value}
              onChange={(e) =>
                dispatch({
                  type: "catchPassword2Change",
                  password2Chosen: e.target.value,
                })
              }
            />
            <Button
              sx={TestBtn}
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
              fullWidth
            >
              <Typography variant="subtitle1">Submit</Typography>
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Test;
