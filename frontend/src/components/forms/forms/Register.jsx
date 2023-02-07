import { useImmerReducer } from "use-immer";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//icons
import { AddCircleSharp } from "@mui/icons-material";
import { Container } from "@mui/system";

import { Avatar,Grid,Paper,Typography,TextField,Button,} from "@mui/material";

// ALL IMPORTS GO ABOVE THIS LINE \\

//  MAIN FUNCTION START \\
function Register() {
  //REGISTER FORM STYLE START\\
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
  const registerBtn = {
    backgroundColor: "#79B2BE",
    color: "white",
    width: "15rem",
    fontSize: "1rem",
    marginLeft: "5rem",
  };
  //REGISTER FORM STYLE END\\

  const navigate = useNavigate();

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    password2Value: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen;
        break;
      case "catchEmailChange":
        draft.emailValue = action.emailChosen;
        break;
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen;
        break;
      case "catchPassword2Change":
        draft.password2Value = action.password2Chosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
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

  useEffect(() => {
    if (state.sendRequest) {
      //this will generate a token that can be attached to this request.
      const source = axios.CancelToken.source();
      const SignUp = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/users/",
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.password2Value,
              //re_password is a djoser key requirement if confirm password = true (see docs)
            },
            {
              cancelToken: source.token,
            }
          );
          navigate("/");
          console.log(response);
          // navigation set here will redirect the user to the home page if successfull
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest]);
  // The code inside this useEffect will run only when sendRequest is true.
  // it is currently set as false in state. As shown on the form onSubmit
  //handler that state will be changed to True on the submit button click
  //to execute the code in the useEffect hook

  return (
    <Container>
      <Grid justifyContent="center">
        <Paper elevation={19} sx={paperStyle}>
          <Grid align="center" marginTop="rem">
            <Avatar sx={avatarStyle}>
              <AddCircleSharp />
            </Avatar>
            <h1 sx={headerStyle}>Register below.</h1>
            <Typography variant="caption">
              Complete the form below to create an account.
            </Typography>
          </Grid>
          <form onSubmit={FormSubmitHandler}>
            <TextField
              margin="normal"
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              placeholder="Enter your username"
              // the value prop will catch the values from the form field this must be taken from state
              value={state.usernameValue}
              onChange={(e) =>
                dispatch({
                  type: "catchUsernameChange",
                  usernameChosen: e.target.value,
                })
              }
              //here dispatch will collect the user input and store it's value in the usernameChosen variable with this event handler.
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
// The FormSubmitHandler handle function above was called with the event
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

///////////OLD STATE MANAGEMENT REPLACED BY immerReducer/////

// //       Post FORM REQUEST START     \\
// const [sendRequest, setSendRequest] = useState(false);
// //see notes below on this state and it's functionality

// //state to manage form values
// const [usernameValue, setUsernameValue] = useState("");
// const [emailValue, setEmailValue] = useState("");
// const [passwordValue, setPasswordValue] = useState("");
// const [password2Value, setPassword2Value] = useState("");

// useEffect(()=> {
//   console.log(password2Value)
// }, [password2Value]);
//this code was used to test the state in the username section of the form.
///////////OLD STATE MANAGEMENT REPLACED BY immerReducer/////
