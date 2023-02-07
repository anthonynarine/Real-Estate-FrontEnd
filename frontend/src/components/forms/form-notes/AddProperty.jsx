import { useImmerReducer } from "use-immer";
import { React, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//icons
import { AddCircleSharp } from "@mui/icons-material";

import {
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
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

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

  const formBtnStyles = {
    registerBtn: {
      backgroundColor: "#79B2BE",
      justifyContent: "center",
      color: "white",
      width: "60rem",
      fontSize: "1rem",
      marginTop: "2rem",
      marginLeft: "8rem",
      marginRight: "rem",
      marginBottom: ".5rem",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#22ffe9",
        color: "#f638dc",
      },
    },
  };

  const styling = {
    container: {
      width: "90%",
      justifyContent: "auto",
      backgroundColor: "white",
      border: "3px solid",
      borderColor: "#79B2BE",
      margin: "auto",
      marginTop: "1rem",
    },
    gridItem: {
      width: "47%",
      marginBottom: "0rem",
      marginLeft: "1.3rem",
    },
    gridItemArea: {
      marginLeft: "4rem",
    },
    gridItemCheckbox: {
      width: "15%",
      marginBottom: "1rem",
      marginRight: "6rem",
    },
    checkboxContainer: {
      width: "90%",
      justifyContent: "center",
      marginLeft: "4rem",
    },
    mapContainer: {
      width: "90%",
      height: "75rem",
      marginTop: "1rem",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "6rem",
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
    mapInstance: null,
    //the markerPosition objece will need to be labeled as show below/
    //lat for latitude and lng for longitude.THIS IS WHAT LEAFLET EXPECTS
    markerPosition: { lat: "40.65311", lng: "-73.944022"},
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

      case "getMap":
        draft.mapInstance = action.mapData;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  //   HOOK PROVIDING LEAFLET MAP INSTANCE IN ANY DECEDANT OF MAPCONTAINER (SEE LEAFLET DOCS)
  //   dispatch added
  function MyMapComponent() {
    const map = useMap();
    dispatch({ type: "getMap", mapData: map });
    return null;
  }

  // USE EFFECT TO CHANGE THE MAP VIEW DEPENDING ON CHOSEN BOROUGH
  useEffect(() => {
    if (state.areaValue === "Queens") {
      state.mapInstance.setView([40.728918328545674, -73.7947734809174], 12);
    } else if (state.areaValue === "Brooklyn") {
      state.mapInstance.setView([40.67802815856073, -73.94497138770943], 12);
    } else if (state.areaValue === "Manhattan") {
      state.mapInstance.setView([40.78297723250647, -73.97299614618669], 12);
    } else if (state.areaValue === "Bronx") {
      state.mapInstance.setView([40.851822844384564, -73.88683657178883], 12);
    } else if (state.areaValue === "Statin Island") {
      state.mapInstance.setView([40.584233704376764, -74.15788838492944], 12);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.areaValue]);

  //DRAGABLE MARKER FUNCTIONALITY\\
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        console.log(marker.getLatLng());
      },
    }),
    [],
  )


  //FORM SUBMIT HANDLE FUNCTIONALITY START\\
  function FormSubmitHandler(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
    //onSubmit sendRequst changes to the opposite of what it courrently is
  }
  //FORM SUBMIT HANDLE FUNCTIONALITY END\\

  return (
    <form onSubmit={FormSubmitHandler}>
      <Grid align="center" marginTop="rem">
        <h1 sx={headerStyle}>Add a property</h1>
      </Grid>
      <Grid sx={styling.container} container rowSpacing={2} margin={2}>
        <Grid item sx={styling.gridItem}>
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
        <Grid item sx={styling.gridItem}>
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
        <Grid item sx={styling.gridItem}>
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
        <Grid item sx={styling.gridItem}>
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
        <Grid item sx={styling.gridItem}>
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
        <Grid item sx={styling.gridItem}>
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
        <Grid sx={styling.checkboxContainer} container spacing={2} margin={2}>
          <Grid item sx={styling.gridItemCheckbox}>
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
          </Grid>
          <Grid item sx={styling.gridItemCheckbox}>
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
          </Grid>

          <Grid item sx={styling.gridItemCheckbox}>
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
          </Grid>
          <Grid item sx={styling.gridItemCheckbox}>
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
          </Grid>
        </Grid>
        {/* CHECK BOX RENDER END             */}
        <Grid item sx={styling.gridItemArea}>
          <FormControl>
            <FormGroup>
              <TextField
                margin="normal"
                id="area"
                label="Area"
                variant="standard"
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
        </Grid>
        <Grid item sx={styling.mapContainer} container spacing={6}>
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

            <MyMapComponent />
            {/* {zipCodeDisplay polygon functionality to be a future addition} */}
            <Marker
              draggable
              eventHandlers={eventHandlers}
              position={state.markerPosition}
              ref={markerRef}
            ></Marker>
          </MapContainer>
          <Stack>
            <Button
              fullWidth
              sx={formBtnStyles.registerBtn}
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
            >
              <Typography variant="subtitle1">Submit</Typography>
            </Button>
            <Button
              sx={formBtnStyles.registerBtn}
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
              onClick={() =>
                console.log(
                  state.mapInstance.flyTo(
                    [40.79081987542505, -73.95313983253074],15 ))}
            >
              <Typography variant="subtitle1">Test</Typography>
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddProperty;
