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

// REACT LEAFLET \\
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// ALL IMPORTS GO ABOVE THIS LINE \\

const areaOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Brooklyn",
    label: "Brooklyn",
  },
  {
    value: "Queens",
    label: "Queens",
  },
  {
    value: "Bronx",
    label: "Bronx",
  },
  {
    value: "Manhattan",
    label: "Manhattan",
  },
  {
    value: "Statin Island",
    label: "Statin Island",
  },
];

function AddProperty() {
  //REGISTER FORM STYLE START\\
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
      marginLeft: "10",
      marginRight: "10rem",
      marginBottom: ".5rem",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#22ffe9",
        color: "#f638dc",
      },
    },
  };

  const FormContainerStyles = {
    container: {
      width: "75%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "3rem",
      border: "3px solid black",
      padding: "3rem",
    },
    itemContainer: {
      marginTop: "rem",
      marginLeft: "2rem",
      marginRight: "2rem"
    },
    mapContainer: {
      align: "row"
    }
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


  return (
    <Grid Container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}  sx={FormContainerStyles.container}>
          <form onSubmit={FormSubmitHandler}>
          <Grid align="center" marginTop="rem">
            <h1 sx={headerStyle}>Add a property</h1>
          </Grid>
            <Grid item sx={FormContainerStyles.itemContainer} spacing={2}>
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
            </Grid>
            <Grid item sx={FormContainerStyles.itemContainer}>
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
            </Grid>
            <Grid item sx={FormContainerStyles.itemContainer}>
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
            </Grid>
            <Grid item sx={FormContainerStyles.itemContainer}>
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
            </Grid>
            <Grid item sx={FormContainerStyles.itemContainer}>
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
            </Grid>
            <Grid item sx={FormContainerStyles.itemContainer}>
              <Paper></Paper>
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
            </Grid>
            <Grid item sx={FormContainerStyles.itemContainer}>
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
            </Grid>
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
                        poolChosen: e.target.checked,
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
            <FormControl>
              <FormGroup>
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
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  {areaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </FormGroup>
            </FormControl>
            <Grid item sx={{ height: "70rem" }}>
 {/* MAP              */}
              <MapContainer
                center={[40.65311, -73.944022]}
                zoom={12}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </Grid>
            <Stack >
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

    </Grid>
  );
}

export default AddProperty;
