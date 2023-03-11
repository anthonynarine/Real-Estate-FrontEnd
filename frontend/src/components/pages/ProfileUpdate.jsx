// This component contains the prifile form along with the user data displayed.
// It it is the child component of Profile.jsx

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
    borderRadius: 2,
    backgroundColor: "#FDFDFD",
    border: "solid #8E3179",
  },
  btn: {
    backgroundColor: "#8E3179",
    marginTop: "1.75rem",
    color: "white",
    fontSize: "1rem",
    width: "20rem",
    "&:hover": {
      bacgroundColor: "#8E3179",
      color: "#9A8DA7"
    },
  },
};
//FORM STYLE END\\
function ProfileUpdate({ userProfile }) {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContex);

  console.log("USERPROFILE as Prop cp 42", userProfile);

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    agencyNameValue: userProfile.agencyName,
    phoneNumberValue: userProfile.phoneNumber,
    bioValue: userProfile.bio,
    uploadedPicture: [],
    profilePictureValue: userProfile.profilePic,
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
        const formData = new FormData();
        // if the user profile info is updated but the the profile pic a 400 error will come up
        // the conditional below eliminates this error.
        if (
          typeof state.profilePictureValue === "string" ||
          state.profilePictureValue === null
        ) {
          formData.append("agency_name", state.agencyNameValue);
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("bio", state.bioValue);
          formData.append("seller", GlobalState.userId);
        } else {
          formData.append("agency_name", state.agencyNameValue);
          formData.append("phone_number", state.phoneNumberValue);
          formData.append("bio", state.bioValue);
          formData.append("profile_picture", state.profilePictureValue);
          formData.append("seller", GlobalState.userId);
        }
        try {
          const response = await axios.patch(
            `http://localhost:8000/api/profiles/${GlobalState.userId}/update/`,
            formData
          );
          console.log(response.data);
          //navigate(0) will refresh the page to update user profile.
          // NOTE PAGE CURRENTLY LOGS OUT USER ON REFRESH AND UPDATE THIS NEEDS TO BE FIXED
          navigate(0);
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

  //Function to conditionally render name or image based
  //If user has uploaded a pic or is updating a pic
  //test by changing profile pic
  function ProfilePictureDisplay() {
    if (typeof state.profilePictureValue !== "string") {
      return (
        <ul>
          {state.profilePictureValue ? (
            <li>{state.profilePictureValue.name}</li>
          ) : (
            ""
          )}
        </ul>
      );
    } else if (typeof state.profilePictureValue === "string") {
      return (
        <Grid item container rowSpacing={1}>
          <Grid item sx={6}>
            <img
              style={{
      //This color is called Rebecca purple https://www.color-name.com/trending-purple-colors
                border: "solid #663399",
                // borderTopLeftRadius: "1px",
                borderTopRightRadius: "50%",
                // borderBottomRightRadius: "5px",
                // borderBottomLefttRadius: "50%",
                height: "5rem",
                width: "5rem",
                borderRadius: "50%",
              }}
              alt="small profile img"
              src={userProfile.profilePic}
            />
          </Grid>
        </Grid>
      );
    }
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
      <Grid item container direction="column" alignItems="center">
        <Paper sx={pStyling.paperStyle} elevation={24}>
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
            <Grid
              item
              sx={{ marginTop: "2rem" }}
              container
              direction="column"
              alignItems="center"
            >
              <Grid item>{ProfilePictureDisplay()}</Grid>
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
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProfileUpdate;
