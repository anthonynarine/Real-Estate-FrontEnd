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
  FormControl,
  FormGroup,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// ALL IMPORTS GO ABOVE THIS LINE \\
function AddProperty() {
  //REGISTER FORM STYLE START\\
  const paperStyle = {
    padding: "30px 70px",
    width: 400,
    margin: "60px auto",
  };
  const headerStyle = {
    margin: 0,
  };
  const avatarStyle = {
    backgroundColor: "#79B2BE",
  };

  const formBtnStyles = {
    registerBtn: {
      backgroundColor: "#79B2BE",
      color: "white",
      width: "15rem",
      fontSize: "1rem",
      marginLeft: "5rem",
      marginBottom: ".5rem",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#22ffe9",
        color: "#f638dc",
      },
    },
  };

  //REGISTER FORM STYLE END\\

  const navigate = useNavigate();

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    titleValue: "",
    listingTypeValue: "",
    descriptionValue: "",
    areaValue: "",
    latitudeValue: "",
    longitudeValue: "",
    propertyStatusValue: "",
    priceValue: "",
    rentalFequencyValue: "",
    roomsValue: "",
    furnishedValue: false,
    poolValue: false,
    elevatorValue: false,
    parkingValue: false,
    datePostedValue: false,
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchTitleChange":
        draft.usernameValue = action.usernameChosen;
        break;

      case "catchListingTypeChange":
        draft.listingtypeValue = action.listingTypeChosen;
        break;

      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        break;

      case "catchAreaChange":
        draft.areaValue = action.areaChosen;
        break;

      case "catchLatitudeChange":
        draft.latitudeValue = action.latitudeChosen;
        break;

      case "catchLongitudeChange":
        draft.longitudeValue = action.longitudeChosen;
        break;

      case "catchPropertyStatusChange":
        draft.propertyStatusValue = action.propertyStatusChosen;
        break;

      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        break;

      case "catchRentalFrequencyChange":
        draft.rentalFrequenceValue = action.rentalFrequencyChosen;
        break;

      case "catchRoomsChange":
        draft.roomseValue = action.roomsChosen;
        break;

      case "catchFurnishedChange":
        draft.furnishedValue = action.furnishedChosen;
        break;

      case "catchPoolChange":
        draft.poolValue = action.poolChosen;
        break;

      case "catchElevatorChange":
        draft.elevatorValue = action.elevatorChosen;
        break;

      case "catchParkingChange":
        draft.parkingValue = action.parkingChosen;
        break;

      case "catchDatePostedChange":
        draft.datePostedValue = action.datePostedChosen;
        break;

      case "catchPicture1Change":
        draft.picture1Value = action.picture1Chosen;
        break;

      case "catchPicture2Change":
        draft.picture2Value = action.picture2Chosen;
        break;

      case "catchPicture3Change":
        draft.picture3Value = action.picture3Chosen;
        break;

      case "catchPicture4Change":
        draft.picture4Value = action.picture4Chosen;
        break;

      case "catchPicture5Change":
        draft.picture5Value = action.picture5Chosen;
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

  return (
    <Container>
      <Grid justifyContent="center">
        <Paper elevation={19} sx={paperStyle}>
          <Grid align="center" marginTop="rem">
            <Avatar sx={avatarStyle}>
              <AddCircleSharp />
            </Avatar>
            <h1 sx={headerStyle}>Add a property</h1>
            <Typography variant="caption">
              Complete the form below to create a new listing.
            </Typography>
          </Grid>
          <form onSubmit={FormSubmitHandler}>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter the title of your listing"
                  // the value prop will catch the values from the form field this must be taken from state
                  value={state.titleValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchTitleChange",
                      titleChosen: e.target.value,
                    })
                  }
                  //here dispatch will collect the user input and store it's value in the titleChosen variable with this event handler.
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="listingType"
                  label="Listing Type"
                  variant="outlined"
                  fullWidth
                  placeholder="Enter Typye of listing"
                  value={state.listingTypeValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchlistingTypeChange",
                      listingTypeChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  placeholder="Describe you Listing"
                  value={state.descriptionValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchDescriptionChange",
                      listingTypeChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="area"
                  label="Area"
                  variant="outlined"
                  fullWidth
                  placeholder="Borough"
                  value={state.areaValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchAreaChange",
                      areaChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="propertyStatus"
                  label="Property Status"
                  variant="outlined"
                  fullWidth
                  placeholder="Rental or Sale"
                  value={state.propertyStatusValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchPropertyStatusChange",
                      propertyStatusChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="price"
                  label="Price"
                  variant="outlined"
                  fullWidth
                  placeholder="Amount"
                  value={state.priceValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchPriceChange",
                      priceChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="rentalFrequence"
                  label="Rental Frequence"
                  variant="outlined"
                  fullWidth
                  placeholder="Month Week Day Hour"
                  value={state.rentalFequencyValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchRentalFrequencyChange",
                      rentalFrequencyChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
            <FormControl>
              <FormGroup row>
                <TextField
                  margin="normal"
                  id="rooms"
                  label="Rooms"
                  variant="outlined"
                  fullWidth
                  placeholder="Amount of Rooms"
                  value={state.roomsValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchRoomsChange",
                      roomsChosen: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormControl>
{/* CHECK BOX FUNCTIONALITY START             */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.furnishedValue}
                    onChange={(e) =>
                      dispatch({
                        type: "catchFurnishedChange",
                        furnishedChosen: e.target.checked,
                      })
                    }
                  />
                }
                label="Furnished"
              />
            </FormGroup>
{/* CHECK BOX FUNCTIONALITY END             */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.poolValue}
                    onChange={(e) =>
                      dispatch({
                        type: "catchPoolChange",
                        furnishedChosen: e.target.checked,
                      })
                    }
                  />
                }
                label="Pool"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.elevatorValue}
                    onChange={(e) =>
                      dispatch({
                        type: "catchElevatorChange",
                        elevatorChosen: e.target.checked,
                      })
                    }
                  />
                }
                label="Elevator"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.parkingValue}
                    onChange={(e) =>
                      dispatch({
                        type: "catchParkingChange",
                        parkingChosen: e.target.checked,
                      })
                    }
                  />
                }
                label="Parking"
              />
            </FormGroup>
            <Stack>
              <Button
                sx={formBtnStyles.registerBtn}
                type="submit"
                margin="normal"
                variant="contained"
                color="primary"
                fullWidth
              >
                <Typography variant="subtitle1">Submit</Typography>
              </Button>
              <Button
                sx={formBtnStyles.registerBtn}
                type="submit"
                margin="normal"
                variant="contained"
                color="primary"
                fullWidth
              >
                <Typography variant="subtitle1">Clear</Typography>
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default AddProperty;
