import { React, useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import VillaIcon from "@mui/icons-material/Villa";
import NavBarDrawer from "./NavBarDrawer";
import { Link } from "react-router-dom";

//array of tabs used in navbar
const navBarTabs = ["Home","Agencies", "Listings"];

//make sure to set this useState value to false or it will get mad and throw and error.
function NavBar({ tabs }) {
  const [value, setValue] = useState(false);

  //this code block will handle smaller screens
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(theme);
  // console.log(isMatch);

  //handles the indiator underline scroll.
  const handleChange = (event, value) => {
    setValue(value);
  };





  return (
    <>
      <AppBar
        sx={{
          backgroundImage:
            "radial-gradient(circle, rgba(81,70,89,0.936186974789916) 0%, rgba(158,135,163,1) 0%, rgba(121,179,191,1) 100%);", position:"sticky"
        }}
      >
        <Toolbar>
          <VillaIcon
            sx={{ marginRight: 1.5, color: "#760fbf", textAlign: "center" }}
          />
          {isMatch ? (
            <>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  paddingLeft: "10%",
                  color: "#760fbf",
                }}
              >
                Oracle Real Estate Services
              </Typography>
              <NavBarDrawer />
            </>
          ) : (
            <>
              <Tabs
                textColor="inherit"
                indicatorColor="secondary"
                value={value}
                onChange={handleChange}
              >
                {navBarTabs.map((tab, index) => (
                  <Tab 
                  LinkComponent={Link} to={`/${tab === "Home" ? "" : tab}`}
                   key={index} label={tab} />
                ))}
              </Tabs>
              <Button
                sx={{ marginLeft: "auto", background: "rgba(158,135,163,1)" }}
                variant="contained"
              >
                Add Property
              </Button>
              <Button
                sx={{ marginLeft: 1.5, background: "rgba(158,135,163,1)" }}
                variant="contained"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
