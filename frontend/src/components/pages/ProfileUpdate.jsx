/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//FORM STYLE START\\
const pStyling = {
  mainContainer: {
    positon: "absolute",
    height: "75rem",
  },
  paperStyle: {
    padding: "40px 40px",
    width: "50rem",
    marginTop: "15px",
    borderRadius: 5,
    // backgroundColor: "#FDFDFD",
    border: "solid #79B2BE",
  },
  btn: {
    backgroundColor: "#79B2BE",
    marginTop: "1.75rem",
    color: "white",
    fontSize: "1rem",
    width: "20rem",
    "&:hover": {
      bacgroundColor: "purple",
    },
  },
};
//FORM STYLE END\\
function ProfileUpdate(props) {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContex);

  console.log("USERPROFILE TEST", props.userPofile)

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    agencyNameValue: "",
    phoneNumberValue: "",
    bioValue: "",
    uploadedPicture: [],
    profilePictureValue: "",
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchAgencyNameChange":
        draft.agencyNameValue = action.agencyNameChosen;
        break;
      case "catchPhoneNumberChange":
        draft.phoneNumberValue = action.phoneNumberChosen;
        break;
      case "catchBioChange":
        draft.bioValue = action.bioChosen;
        break;
      case "catchUploadedPicture":
        draft.uploadedPicture = action.pictureChosen;
        break;
      case "catchProfilePictureChange":
        draft.profilePictureValue = action.profilePictureChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  //useEffect TO GET UPLOADED PROFILE PICTURE start//
  useEffect(() => {
    if (state.uploadedPicture[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        profilePictureChosen: state.uploadedPicture[0],
      });
    }
  }, [state.uploadedPicture[0]]);
  //useEffect TO CATCH UPLOADED PROFILE PICTURE end//


  //START OF Patch REQUEST TO UPDATE PROFILE \\
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProfile() {
        //The from data we are passing will be stored in the variable as show
        //with the function call FormData() see MDN docs
        const formData = new FormData();
        formData.append("agency_name", state.agencyNameValue);
        formData.append("phone_number", state.phoneNumberValue);
        formData.append("bio", state.bioValue);
        formData.append("profile_picture", state.profilePictureValue);
        formData.append("seller", GlobalState.userId);
        // SENDING THE userId through FormData() returned a string and not integer
        // to this frild was passed in as a key:value pair
        // formData.append("seller", GlobalState.userID);
        //since the sellers information is is passed from the parent App.js we need to set
        //useContext + StateContex and GlobalState
        try {
          const response = await axios.patch(
            `http://localhost:8000/api/profiles/${GlobalState.userId}/update/`,
            formData
          );
          console.log(response.data);
          // navigate("/listings");
        } catch (error) {
          console.log(error.response);
        }
      }
      UpdateProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest]);
  //END OF PATC REQUEST TO UPDATE PROFIEL\\

  function FormSubmitHandler(event) {
    event.preventDefault();
    dispatch({ type: "changeSendRequest" });
  }

  return (
    <Grid
      sx={pStyling.mainContainer}
      item
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Paper sx={pStyling.paperStyle} elevation={20}>
          <form onSubmit={FormSubmitHandler}>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Typography variant="h4">My Profile</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                id="agencyName"
                label="Agency Name *"
                variant="outlined"
                fullWidth
                placeholder="Agency Name"
                value={state.agencyNameValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchAgencyNameChange",
                    agencyNameChosen: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                id="phoneNumber"
                label="Phone Number *"
                variant="outlined"
                fullWidth
                placeholder="Phone Number"
                value={state.phoneNumberValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPhoneNumberChange",
                    phoneNumberChosen: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item>
              <TextField
                margin="normal"
                id="bio"
                label="Bio"
                variant="outlined"
                multiline
                rows={7}
                fullWidth
                placeholder="Bio"
                value={state.bioValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchBioChange",
                    bioChosen: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Button
                  sx={pStyling.btn}
                  type="submit"
                  margin="normal"
                  variant="contained"
                  color="success"
                >
                  <Typography variant="subtitle1">Update</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <ul>
                  {state.profilePictureValue ? (
                    <li>{state.profilePictureValue.name}</li>
                  ) : (
                    ""
                  )}
                </ul>
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Button
                  component="label"
                  sx={pStyling.btn}
                  margin="normal"
                  variant="contained"
                  color="success"
                >
                  Profile Picture
                  {/* self closing input tag for img uplaod */}
                  <input
                    onChange={(e) =>
                      dispatch({
                        type: "catchUploadedPicture",
                        pictureChosen: e.target.files,
                      })
                    }
                    type="file"
                    // hides the choose files box \\
                    hidden
                    multiple
                    accept="image/png, image/jif, image/jpeg image/svg"
                  />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfileUpdate;
