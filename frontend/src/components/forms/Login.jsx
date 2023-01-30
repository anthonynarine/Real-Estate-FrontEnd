import React from "react";
import { useNavigate } from "react-router-dom";

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

// ALL IMPORTS GO ABOVE THIS LINE \\

//  MAIN FUNCTION START \\
function Login() {
  //PAGE NAVIGATION \\
  const navigate = useNavigate();

  //LOGIN FORM STYLE START\\
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
          <form>
            <TextField
              margin="normal"
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              placeholder="E-mail Address"
            />
            <TextField
              type="password"
              margin="normal"
              id="password"
              label="Password"
              variant="outlined"
              fullWidth
              placeholder="Enter Pasword"
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
                  Sign Up
                </span>
              </Typography>
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Login;


// MAIN FUNCTION ENDS \\
