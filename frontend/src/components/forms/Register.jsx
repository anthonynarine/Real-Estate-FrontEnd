import React from "react";
import {Avatar, Grid, Paper, Typography, TextField, Button,} from "@mui/material";

//icons
import { AddCircleSharp } from "@mui/icons-material";
import { Container } from "@mui/system";

function Register() {
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

  return (
    <Container>
      <Grid justifyContent="center">
        <Paper elevation={20} sx={paperStyle}>
          <Grid align="center" marginTop="rem">
            <Avatar sx={avatarStyle}>
              <AddCircleSharp />
            </Avatar>
            <h1 sx={headerStyle}>Register</h1>
            <Typography variant="caption">
              Complete from to create an account{" "}
            </Typography>
          </Grid>
          <form>
            <TextField
              margin="normal"
              id="username"
              label="Name"
              variant="outlined"
              fullWidth
              placeholder="Enter your username"
            />
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
              Submit
            </Button>
            <Button
              type="submit"
              margin="normal"
              variant="small"
              color="primary"
              fullWidth
            >
              Already have an account?...{" "}
              <span style={{ cursor: "pointer", color: "green" }}>Sign In</span>
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Register;

