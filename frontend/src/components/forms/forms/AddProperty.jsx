/* eslint-disable react-hooks/exhaustive-deps */
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useRef, useMemo, useContext } from "react";
import axios from "axios";

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

//Contexts
import StateContext from "../../contex/StateContex";

// REACT LEAFLET \\
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { BrightnessLow } from "@mui/icons-material";

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

const listingTypeOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Apartment",
    label: "Apartment",
  },
  {
    value: "House",
    label: "House",
  },
  {
    value: "Office",
    label: "Office",
  },
  {
    value: "Commercial Space",
    label: "Commercial Space",
  },
  {
    value: "Parking Space",
    label: "Parking Space",
  },
];
const rentalFrequenceOption = [
  {
    value: "",
    label: "",
  },
  {
    value: "Month",
    label: "Month",
  },
  {
    value: "Week",
    label: "Week",
  },
  {
    value: "Day",
    label: "Day",
  },
  {
    value: "Hour",
    label: "Hour",
  },
];
const propertyStatusOption = [
  {
    value: "",
    label: "",
  },
  {
    value: "Sale",
    label: "Sale",
  },
  {
    value: "Rent",
    label: "Rent",
  },
];

function AddProperty() {
  //FORM STYLE START\\
  const styling = {
    mainContainer: {
      positon: "absolute",
      border: "solid black",
      height: "200rem",
    },
    paperStyle: {
      padding: "30px 50px",
      width: "75rem",
      margin: "50px auto",
      borderRadius: 5,
      backgroundColor: "#FDFDFD",
    },
    mapGrid: {
      marginLeft: "30px",
      width: "60rem",
      paddingBottom: "20px",
      martinTop: "25px",
      // border: "solid"
    },
    titleGrid: {
      marginBottom: "8px",
    },
    numAndDescGrid: {
      marginBottom: "20px",
      marginTop: "px",
      // border: 'solid',
      marginLeft: ".25px",
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
      width: "30rem",
      marginBottom: "25px",
      marginTop: "18px",
    },
  };
  //FORM STYLE END\\

  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    titleValue: "",
    // typeOfListingValue: "",
    listingTypeValue: "",
    descriptionValue: "",
    areaValue: "",
    propertyStatusValue: "",
    priceValue: "",
    rentalFrequencyValue: "",
    roomsValue: "",
    furnishedValue: false,
    poolValue: false,
    elevatorValue: false,
    parkingValue: false,
    latitudeValue: "",
    longitudeValue: "",
    picture1Value: "",
    picture2Value: "",
    picture3Value: "",
    picture4Value: "",
    picture5Value: "",
    mapInstance: null,
    //the markerPosition objecet will need to be labeled as show below/
    //lat for latitude and lng for longitude.THIS IS WHAT LEAFLET EXPECTS
    markerPosition: {
      lat: "40.65311",
      lng: "-73.944022",
    },
    //used to store uploaded images
    uploadedPictures: [],
    sendRequest: 0,
    userProfile: {
      agencyName: "",
      phoneNumber: "",
    },
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        break;
      // case "catchTypeOfListingChange":
      //   draft.typeOfListingValue = action.typeOfListingChosen;
      //   break;
      case "catchListingTypeChange":
        draft.listingTypeValue = action.listingTypeChosen;
        break;
      case "catchPropertyStatusChange":
        draft.propertyStatusValue = action.propertyStatusChosen;
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
      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        break;
      case "catchRentalFrequencyChange":
        draft.rentalFrequencyValue = action.rentalFrequencyChosen;
        break;
      case "catchRoomsChange":
        draft.roomsValue = action.roomsChosen;
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
        draft.uploadedPictures = action.picturesChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
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
  }, [state.uploadedPictures[0]]);
  useEffect(() => {
    if (state.uploadedPictures[1]) {
      dispatch({
        type: "catchPicture2change",
        picture2Chosen: state.uploadedPictures[1],
      });
    }
  }, [state.uploadedPictures[1]]);
  useEffect(() => {
    if (state.uploadedPictures[2]) {
      dispatch({
        type: "catchPicture3change",
        picture3Chosen: state.uploadedPictures[2],
      });
    }
  }, [state.uploadedPictures[2]]);
  useEffect(() => {
    if (state.uploadedPictures[3]) {
      dispatch({
        type: "catchPicture4change",
        picture4Chosen: state.uploadedPictures[3],
      });
    }
  }, [state.uploadedPictures[3]]);
  useEffect(() => {
    if (state.uploadedPictures[4]) {
      dispatch({
        type: "catchPicture5change",
        picture5Chosen: state.uploadedPictures[4],
      });
    }
  }, [state.uploadedPictures[4]]);
  //Image upload set of useEffect end//

  // Function will display price per period seleced called as props in Price Texfield //
  function PriceDisplay() {
    if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Hour"
    ) {
      return "Price per hour*";
    }
    if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Day"
    ) {
      return "Price per Day*";
    } else if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Week"
    ) {
      return "Price per week*";
    } else if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Month"
    ) {
      return "Price per Month*";
    } else {
      return "Price*";
    }
  }

  // REQUEST TO GET PROFILE INFO//
  // useEffect will run once when page loads
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        // backticks w/ string inperpolation to grab the user's id from GlobalState
        const response = await axios.get(
          `http://localhost:8000/api/profiles/${GlobalState.userId}/`
        );
        console.log("DATA:", response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetProfileInfo();
  }, []);

  //FORM SUBMIT HANDLE FUNCTIONALITY START\\
  function FormSubmitHandler(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
    //onSubmit sendRequst changes to the opposite of what it courrently is
  }

  //START OF POST REQUEST TO ADD A LISTING \\
  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        //The from data we are passing will be stored in the variable as show
        //with the function call FormData() see MDN docs
        const formData = new FormData();
        formData.append("title", state.titleValue);
        formData.append("description", state.descriptionValue);
        formData.append("area", state.areaValue);
        formData.append("listing_type", state.listingTypeValue);
        formData.append("property_status", state.propertyStatusValue);
        formData.append("price", state.priceValue);
        formData.append("rental_frequencey;", state.rentalFrequencyValue);
        formData.append("rooms;", state.roomsValue);
        formData.append("furnished", state.furnishedValue);
        formData.append("pool", state.poolValue);
        formData.append("elevator", state.elevatorValue);
        formData.append("parking", state.parkingValue);
        formData.append("latitude", state.latitudeValue);
        formData.append("longitude", state.longitudeValue);
        formData.append("picture1", state.picture1Value);
        formData.append("picture2", state.picture2Value);
        formData.append("picture3", state.picture3Value);
        formData.append("picture4", state.picture4Value);
        formData.append("picture5", state.picture5Value);
        formData.append("seller", GlobalState.userid);
        // SENDING THE userId through FormData() returned a string and not integer
        // to this frild was passed in as a key:value pair BrightnessLow
        // formData.append("seller", GlobalState.userID);
        //since the sellers information is is passed from the parent App.js we need to set
        //useContext + StateContex and GlobalState
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/listings/create/",
            formData
          );
          console.log(response.data);
          navigate("/listings");
        } catch (error) {
          console.log(error.response);
        }
      }
      AddProperty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest]);
  //END OF POST REQUEST TO ADD A LISTING \\

  function SubmitButtonDisplay() {
    if (
      GlobalState.userIsLogged &&
      state.userProfile.agencyName !== null &&
      state.userProfile.agencyName !== "" &&
      state.userProfile.phoneNumber !== null &&
      state.userProfile !== ""
    ) {
      return (
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
      );
    } else if (
      GlobalState.userIsLogged &&
      (state.userProfile.agencyName === null ||
        state.userProfile === "" ||
        state.userProfile.phoneNumber === null ||
        state.userProfile.phoneNumber === "")
    ) {
      return (
        <Button
          fullWidth
          sx={styling.submitBtn}
          margin="normal"
          variant="outlined"
          color="primary"
          //onClick to link to profile page
          onClick={() => navigate("/profile")}
        >
          <Typography variant="subtitle1">
            Complete your profile to add your listing
          </Typography>
        </Button>
      );
      // if user is not logged in
    } else if (!GlobalState.userIsLogged) {
      return (
        <Button
          fullWidth
          sx={styling.submitBtn}
          margin="normal"
          variant="contained"
          color="primary"
          //onClick to link to the signup page
          onClick={() => navigate("/login")}
        >
          <Typography variant="subtitle1">Sign in to add a listing</Typography>
        </Button>
      );
    }
  }

  return (
    <Grid
      sx={styling.mainContainermainContainer}
      item
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
            sx={styling.titleGrid}
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                margin="normal"
                id="title"
                label="Title*"
                variant="standard"
                fullWidth
                color="success"
                placeholder="Title"
                value={state.titleValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchTitleChange",
                    titleChosen: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                margin="normal"
                id="propertyStatus"
                label="Property Status*"
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
                select
                SelectProps={{ native: true }}
              >
                {propertyStatusOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                id="listingType"
                label="Listing Type*"
                variant="outlined"
                fullWidth
                select
                SelectProps={{ native: true }}
                value={state.listingTypeValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchListingTypeChange",
                    listingTypeChosen: e.target.value,
                  })
                }
              >
                {listingTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                margin="normal"
                id="price"
                //SETTING PRICE TO A FUNCTION
                label={PriceDisplay()}
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
            {/* RENTAL FREQUENCY              */}
            <Grid item xs={6}>
              <TextField
                //disables the rental frequence field if sale is selected
                //disabled prop applied to textfiled greys the field out
                disabled={state.propertyStatusValue === "Sale" ? true : false}
                margin="normal"
                id="rentalFrequency"
                label="Rental Frequency"
                variant="outlined"
                fullWidth
                value={state.rentalFrequencyValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchRentalFrequencyChange",
                    rentalFrequencyChosen: e.target.value,
                  })
                }
                select
                SelectProps={{ native: true }}
              >
                {rentalFrequenceOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              sx={styling.numAndDescGrid}
              container
              justifyContent="space-between"
              spacing={4}
              direction="row-reverse"
              alignItems="center"
            >
              {/* This ternery condition will check if the listing type is Office and if that's the case
    it the # of rooms filed willnot be renderd.           */}
              {state.listingTypeValue === "Office" ? (
                ""
              ) : (
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    color="success"
                    margin="normal"
                    id="rooms"
                    label="Number of Rooms"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Number of Rooms"
                    value={state.roomsValue}
                    onChange={(e) =>
                      dispatch({
                        type: "catchRoomsChange",
                        roomsChosen: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}
              <Grid item xs={10} justifyContent="center">
                <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Description"
                  value={state.descriptionValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchDescriptionChange",
                      descriptionChosen: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DESCRIPTION              */}
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
                {/* self closing input tag for img uplaod */}
                <input
                  onChange={(e) =>
                    dispatch({
                      type: "catchUploadedPictures",
                      picturesChosen: e.target.files,
                    })
                  }
                  type="file"
                  // hides the choose files box
                  hidden
                  multiple
                  accept="image/png, image/jif, image/jpeg image/svg"
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
              {/* conditional render of the submit button */}
              {SubmitButtonDisplay()}
            </Grid>
          </Grid>
          {/* FLY TOO FUNCTIONALITY */}
          {/* <Grid
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
          </Grid> */}
          {/* TEST BUTTON START */}
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
                onClick={() => console.log(state.uploadedPictures)}
              >
                TEST
              </Button>
            </Grid>
          </Grid>
          {/* TEST BUTTON END */}

          {/* // NOT ABLE TO GET THIS FUNCTIONALITY TO WORK AS YOU SEE LECTURES 71 // */}
          {/* // NOT ABLE TO GET THIS FUNCTIONALITY TO WORK AS YOU SEE LECTURES 71 // */}
          {/* THIS SHOULD RENDER THE IMAGE NAMES ONCE */}
          {/* <Grid container direction="column" justifyContent="flex-star" aligItems="center"> */}
          {/* <Grid item>
                <ul> */}
          {/* {state.picture1Value ? <li>{state.picture1Value.name}</li> : ""}
                  {state.picture2Value ? <li>{state.picture2Value.name}</li> : ""}
                  {state.picture3Value ? <li>{state.picture3Value.name}</li> : ""}
                  {state.picture4Value ? <li>{state.picture4Value.name}</li> : ""}
                  {state.picture5Value ? <li>{state.picture5Value.name}</li> : ""} */}
          {/* we'll check if check if state.picture1Value exist and if that's the case we want do render 
              an li element if no we want to render an empty string  */}
          {/* </ul>
                </Grid>
              </Grid> */}
        </form>
      </Paper>
    </Grid>
  );
}

export default AddProperty;
