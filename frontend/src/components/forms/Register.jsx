import { React, useEffect, useState } from "react";
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
function Register() {
  //PAGE NAVIGATION BEGIN\\
  const navigate = useNavigate();

  //REGISTER FORM STYLE START\\
  const paperStyle = {
    padding: "30px 20px",
    width: 400,
    margin: "20px auto",
  };
  const headerStyle = {
    margin: 0,
  };
  const avatarStyle = {
    backgroundColor: "#79B2BE",
  };
  const registerBtn = {
    backgroundColor: "#79B2BE",
    color: "white",
    width: "15rem",
    fontSize: "1rem",
    marginLeft: "5rem",
    "&:hover": {
      bacgroundColor: "green",
    },
  };
  //REGISTER FORM STYLE END\\

  //FORM SUBMIT HANDLE FUNCTIONALITY START\\
  function FormSubmit(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    setSendRequest(!sendRequest);
    //onSubmit sendRequst changes to the opposite of what it courrently is
  }
  //FORM SUBMIT HANDLE FUNCTIONALITY END\\

  //       Post FORM REQUEST START     \\
  const [sendRequest, setSendRequest] = useState(false);
  //see notes below on this state and it's functionality

  useEffect(() => {
    if (sendRequest){
      
      //this will generate a token that can be attached to this request.
      const source = axios.CancelToken.source();
      const SignUp = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/users/",
            {
              username: "testinguser",
              email: "testing@mail.com",
              password: "mypass123",
              re_password: "mypass123",
              //re_password is a djoser key requirement if confirm password = true (see docs)
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error.response);
        }
      };
      SignUp();
      //CLEAN UP FUNCTION WITH TOKEN CANCEL START
      return () => {
        source.cancel();
      };
      //CLEAN UP FUNCTION WITH TOKEN CANCEL END
    }
  }, [sendRequest]);
  // The code inside this useEffect will run only when sendRequest is true.
  // it is currently set as false in state. As shown on the form onSubmit
  //handler that state will be changed to True on the submit button click
  //to execute the code in the useEffect hook

  return (
    <Container>
      <Grid justifyContent="center">
        <Paper elevation={20} sx={paperStyle}>
          <Grid align="center" marginTop="rem">
            <Avatar sx={avatarStyle}>
              <AddCircleSharp />
            </Avatar>
            <h1 sx={headerStyle}>Register below.</h1>
            <Typography variant="caption">
              Complete the form below to create an account.
            </Typography>
          </Grid>
          <form onSubmit={FormSubmit}>
            <TextField
              margin="normal"
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              placeholder="Enter your username"
            />
            <TextField
              margin="normal"
              id="email"
              label="Email "
              variant="outlined"
              fullWidth
              placeholder="E-mail Address"
            />
            <TextField
              type="password"
              margin="normal"
              id="password"
              label="Password "
              variant="outlined"
              fullWidth
              placeholder="Enter Pasword"
            />
            <TextField
              type="password"
              margin="normal"
              id="password2"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              placeholder="Confirm Password"
            />
            <Button
              sx={registerBtn}
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
              fullWidth
            >
              <Typography variant="subtitle1">Sign up</Typography>
            </Button>
            <Button
              type="error"
              margin="normal"
              variant="small"
              color="primary"
              fullWidth
            >
              <Typography variant="overline">
                Already have an account?...{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer", color: "purple" }}
                >
                  Sign In
                </span>
              </Typography>
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Register;

//  MAIN FUNCTION END \\

//event.preventDefault();
// The FormSubmit handle function above was called with the event
// along with >> event.preventDefault();  << syntax to prevent
// default browser behavior (browser will add all form fields to the
//   onsubmint. There will be no url to handle it). so we prevent
//   this default action with event.preventDefault();



//      sendRequest & if conditional notes
// The useEffect hook sends a request to the BackupOutlined whenever
// sendRequest changes. sendRequest will change when the user submits the
// form by clicking on the sign up button

// //we only want to submit the form when the user sends that request
// //so we passin sendRequst (we will use this state to watch for requests)
// //  and an if conditional is added to the useEfect hook to check for
// // sendRquest. without this everytime the page loads a request will
// //be sent to the backend.
