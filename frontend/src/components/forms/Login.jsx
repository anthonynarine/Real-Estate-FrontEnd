import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//icons
import AddHomeIcon from "@mui/icons-material/AddHome";
import { Container } from "@mui/system";

import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

// Context
import DispatchContex from "../contex/DispatchContex";
import StateContex from "../contex/StateContex";
// see app.js for state being brought in by this import via context.

// ALL IMPORTS GO ABOVE THIS LINE \\

//  MAIN FUNCTION START \\
function Login() {
  const GlobalDispatch = useContext(DispatchContex);
  const GlobalState = useContext(StateContex);
  // see app.js for state being brought in by this import via context.

  //LOGIN FORM STYLE START\\
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
  const loginBtn = {
    backgroundColor: "#79B2BE",
    color: "white",
    width: "15rem",
    fontSize: "1rem",
    marginLeft: "5rem",
    "&:hover": {
      bacgroundColor: "green",
    },
  };
  //LOGIN FORM STYLE END\\

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\

  const initialState = {
    usernameValue: "",
    passwordValue: "",
    sendRequest: 0,
    token: "",
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "catchToken":
        draft.token = action.tokenValue;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  const navigate = useNavigate();

  function FormSubmitHandler(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
  }

  // when the user successfully signs in a token is given in this request
  useEffect(() => {
    //when we have an actual value for the token then the request will be sent
    if (state.sendRequest) {
      //this will generate a token that can be attached to this request.
      const source = axios.CancelToken.source();
      const LogIn = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
              //re_password is a djoser key requirement if confirm password = true (see docs)
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          dispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          });
          //to pass data from this child compt to the parent app comp we use Global dispatch.
          //the dispatch type must be added to the reducer function.
          GlobalDispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          });
          // navigate("/")
        } catch (error) {
          console.log(error.response);
        }
      };
      LogIn();
      //CLEAN UP FUNCTION WITH TOKEN CANCEL START
      return () => {
        source.cancel();
      };
      //CLEAN UP FUNCTION WITH TOKEN CANCEL END
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest]);

  //this second useEffect hook will get the users information with the token attatched
  //The token come from the above useEffect request.
  useEffect(() => {
    // if we have an actual value for state.token only then  this useEffect will send out this request
    if (state.token !== "") {
      const source = axios.CancelToken.source();
      const GetUserInfo = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api-auth-djoser/users/me/",
            {
              headers: { Authorization: "Token ".concat(state.token) },
              //a space is required between "Token " and the closing quote
            },
            {
              cancelToken: source.token,
            }
          );
          console.log(response);
          //these cases must be added to our Reducer function in app.js in order to be used here
          GlobalDispatch({
            type: "userSignsIn",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            IdInfo: response.data.id,
          });
          navigate("/")
        } catch (error) {
          console.log(error.response);
        }
      };
      GetUserInfo();
      return () => {
        source.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  return (
    <Container>
      <Grid justifyContent="center">
        <Paper elevation={20} sx={paperStyle}>
          <Grid align="center" marginTop="rem">
            <Avatar sx={avatarStyle}>
              <AddHomeIcon />
            </Avatar>
            <h1 sx={headerStyle}>Log in.</h1>
            <Typography variant="caption">
              Enter your user name and password to log on.
            </Typography>
          </Grid>
          <form onSubmit={FormSubmitHandler}>
            <TextField
              margin="normal"
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              placeholder="Username"
              value={state.usernameValue}
              onChange={(e) =>
                dispatch({
                  type: "catchUsernameChange",
                  usernameChosen: e.target.value,
                })
              }
            />
            <TextField
              type="password"
              margin="normal"
              id="password"
              label="Password"
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
            <Button
              sx={loginBtn}
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
              fullWidth
            >
              <Typography variant="subtitle1">submit</Typography>
            </Button>
            <Button
              type="submit"
              margin="normal"
              variant="small"
              color="primary"
              fullWidth
            >
              <Typography variant="overline">
                Don't have an account?...{" "}
                <span
                  onClick={() => navigate("/register")}
                  style={{ cursor: "pointer", color: "purple" }}
                >
                  Sign up
                </span>
              </Typography>
            </Button>
          </form>
          {/* testing passing data from a child comp to parent via context provider (see lecture 64 pt 1 15:30) */}
          {/* {GlobalState.globalMessage}
          {GlobalState.userToken}
          <br />
          {GlobalState.userUsername}
          <br />
          {GlobalState.userEmail}
          <br />
          {GlobalState.userId} */}
        </Paper>
      </Grid>
    </Container>
  );
}

export default Login;

// MAIN FUNCTION ENDS \\
