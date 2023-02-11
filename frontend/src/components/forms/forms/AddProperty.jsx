import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useRef, useMemo } from "react";

import {
  Grid,
  Paper,
  Button,
  Checkbox,
  TextField,
  FormGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";

// REACT LEAFLET \\
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { borderBottom } from "@mui/system";

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
  //FORM STYLE START\\
  const styling = {
    mainContainer: {
      positon: "absolute",
      border: "solid black",
    },
    paperStyle: {
      padding: "30px 20px",
      width: 1100,
      margin: "50px auto",
      borderRadius: 5,
      backgroundColor: "#FDFDFD",
    },
    mapGrid: {
      marginLeft: "30px",
      width: "60rem",
      paddingBottom: "20px",
      martinTop: "25px",
    },
    submitBtn: {
      backgroundColor: "#79B2BE",
      justifyContent: "center",
      color: "white",
      width: "25rem",
      fontSize: "1rem",
      marginBottom: "1rem",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#22ffe9",
        color: "#e879f9",
      },
    },
    areaContentGrid: {
      width: "20rem",
      marginBottom: "25px",
      marginTop: "15px",
    },
  };
  //FORM STYLE END\\

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
    markerPosition: {
      lat: "40.65311",
      lng: "-73.944022",
    },
    uploadedPictures: [],
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
      case "changeMarkerPosition":
        draft.markerPosition.lat = action.changeLatitude;
        draft.markerPosition.lng = action.changelongitude;
        //code below will change the lat and lng values when a different borough is selected.
        draft.latitudeValue = "";
        draft.longitudeValue = "";
        break;
      case "catchUploadedPictures":
        draft.uploadImages = action.imagesChosen;
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
      //CALLING DISPATCH HERE WILL ALLOW THE MARKER TO SHOW UP AT THE LOCATION OF EACH BOROUGH
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 40.728918328545674,
        changelongitude: -73.7947734809174,
      });
    } else if (state.areaValue === "Brooklyn") {
      state.mapInstance.setView([40.67802815856073, -73.94497138770943], 12);
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 40.67802815856073,
        changelongitude: -73.944971387709434,
      });
    } else if (state.areaValue === "Manhattan") {
      state.mapInstance.setView([40.78297723250647, -73.97299614618669], 12);
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 40.78297723250647,
        changelongitude: -73.97299614618669,
      });
    } else if (state.areaValue === "Bronx") {
      state.mapInstance.setView([40.851822844384564, -73.88683657178883], 12);
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 40.851822844384564,
        changelongitude: -73.88683657178883,
      });
    } else if (state.areaValue === "Statin Island") {
      state.mapInstance.setView([40.584233704376764, -74.15788838492944], 12);
      dispatch({
        type: "changeMarkerPosition",
        changeLatitude: 40.584233704376764,
        changelongitude: -74.15788838492944,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.areaValue]);

  //DRAGABLE MARKER FUNCTIONALITY\\
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        console.log(marker.getLatLng());
        dispatch({
          type: "catchLatitudeChange",
          latitudeChosen: marker.getLatLng().lat,
        });
        dispatch({
          type: "catchLongitudeChange",
          longitudeChosen: marker.getLatLng().lng,
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  // useEffect(() => {
  //   console.log(state.latitudeValue, state.longitudeValue);
  // }, [state.latitudeValue, state.longitudeValue]);
  // will watch for changes in latitude and longitude Values used for testing

  //CATCHING IMAGES UPLOADED. 5 SEPERATE useEffect will be used.
  //YOU NEED TO FIGURE OUT A MORE EFFICIENT WAY TO DO THIS.
  useEffect(() => {
    if (state.uploadedPictures[0]) {
      dispatch({
        type: "catchPicture1change",
        picture1Chosen: state.uploadedPictures[0],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[0]]);
  useEffect(() => {
    if (state.uploadedPictures[1]) {
      dispatch({
        type: "catchPicture2change",
        picture1Chosen: state.uploadedPictures[1],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[1]]);
  useEffect(() => {
    if (state.uploadedPictures[2]) {
      dispatch({
        type: "catchPicture3change",
        picture2Chosen: state.uploadedPictures[2],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[2]]);
  useEffect(() => {
    if (state.uploadedPictures[3]) {
      dispatch({
        type: "catchPicture4change",
        picture2Chosen: state.uploadedPictures[2],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[3]]);
  useEffect(() => {
    if (state.uploadedPictures[4]) {
      dispatch({
        type: "catchPicture5change",
        picture2Chosen: state.uploadedPictures[4],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedPictures[4]]);
  //Image upload set of useEffect end//

  //FORM SUBMIT HANDLE FUNCTIONALITY START\\
  function FormSubmitHandler(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
    //onSubmit sendRequst changes to the opposite of what it courrently is
  }
  //FORM SUBMIT HANDLE FUNCTIONALITY END\\

  return (
    <Grid
      sx={styling.mainContainermainContainer}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={styling.paperStyle} elevation={20}>
        <form onSubmit={FormSubmitHandler}>
          <Grid
            item
            sx={styling.mainContainermainContainer}
            container
            justifyContent="center"
          >
            Add Property
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item>
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
              <Grid item>
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
              <Grid item>
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
              <Grid item>
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
              <Grid item></Grid>
            </Grid>
            {/* CHECK BOX FUNCTIONALITY START             */}
            {/* AREA SELECTION CONTAINER START */}
            {/* {zipCodeDisplay polygon functionality to be a future addition} */}
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={6} sx={styling.areaContentGrid}>
                <TextField
                  id="area"
                  label="Area"
                  variant="outlined"
                  fullWidth
                  value={state.areaValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchAreaChange",
                      areaChosen: e.target.value,
                    })
                  }
                  select
                  SelectProps={{ native: true }}
                >
                  {areaOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* Map container start */}

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center "
            >
              <Grid sx={styling.mapGrid} item display="flex">
                <MapContainer
                  center={[40.65311, -73.944022]}
                  zoom={14}
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
              </Grid>
            </Grid>
            {/* Map container end */}
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                component="label"
                sx={styling.submitBtn}
                margin="normal"
                variant="outlined"
                color="primary"
              >
                Upload images (5 max)
                <input
                  onChange={(e) =>
                    dispatch({
                      type: "catchUploadedPictures",
                      imagesChosen: e.target.files,
                    })
                  }
                  type="file"
                  hidden
                  multip
                  accept="image/png, image/jig, image/jpeg"
                />
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
          >
            <Grid item>
              <Button
                fullWidth
                sx={styling.submitBtn}
                type="submit"
                margin="normal"
                variant="contained"
                color="primary"
              >
                <Typography variant="subtitle1">Submit</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignContent="center"
          >
            <Grid item>

            <Button
              sx={styling.submitBtn}
              type="submit"
              margin="normal"
              variant="contained"
              color="primary"
              onClick={() =>
                console.log(
                  state.mapInstance.flyTo(
                    [40.79081987542505, -73.95313983253074],15 ))}
            >
              <Typography variant="subtitle1">fly To Work</Typography>
            </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default AddProperty;
