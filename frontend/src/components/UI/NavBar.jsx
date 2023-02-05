import { React, useState, useContext } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import VillaIcon from "@mui/icons-material/Villa";
import NavBarDrawer from "./NavBarDrawer";
import { Link } from "react-router-dom";

// context
import StateContex from "../contex/StateContex";

//icons
import { Add, KeyboardDoubleArrowDown, Tune } from "@mui/icons-material";

//array of tabs used in navbar
const navBarTabs = ["Home", "Agencies", "Listings"];

//make sure to set this useState value to false or it will get mad and throw and error.
function NavBar({ tabs }) {
  const [value, setValue] = useState(false);

  const GlobalState = useContext(StateContex);
  

  //this code block will handle smaller screens
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(theme);
  // console.log(isMatch);

  //handles the indiator underline scroll.
  const handleChange = (event, value) => {
    setValue(value);
  };


  const [anchorElm, setAnchorElm] = useState(null);
  const [open, setOpen] = useState(false)
  const handleClose = ()=> {
    setAnchorElm(null)
    setOpen(false)
  };
  const handleClick = (event)=> {
    setAnchorElm(event.currentTarget)
    setOpen(true)
  }


  return (
    <>
      <AppBar
        sx={{
          backgroundImage:
            "radial-gradient(circle, rgba(81,70,89,0.936186974789916) 0%, rgba(158,135,163,1) 0%, rgba(121,179,191,1) 100%);",
          position: "sticky",
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
                    LinkComponent={Link}
                    to={`/${tab === "Home" ? "" : tab}`}
                    key={index}
                    label={tab}
                  />
                ))}
              </Tabs>
              <Button
                sx={{
                  marginLeft: "auto",
                  background: "rgba(158,135,163,1)",
                  color: "blueGrey",
                }}
                variant="contained"
                startIcon={<Add />}
              >
                Add Property
              </Button>
              {/* Button will be conditionally render to show user name if logged in
               or the login button if not. this is done by using GlobalState and the
               ternery statement that checks if the userUsername state value is empty.
                 */}
              {GlobalState.userIsLoggedIn ? (
                <Button
                  LinkComponent={Link}
                  to="/login"
                  sx={{ marginLeft: 1.5, background: "rgba(158,135,163,1)" }}
                  variant="contained"
                  startIcon={<KeyboardDoubleArrowDown />}
                  onClick={handleClick}
                  id="options"
                >
                  {GlobalState.userUsername}
                </Button>
              ) : (
                <Button
                  LinkComponent={Link}
                  to="/login"
                  sx={{ marginLeft: 1.5, background: "rgba(158,135,163,1)" }}
                  variant="contained"
                  startIcon={<KeyboardDoubleArrowDown />}
                >
                  Login
                </Button>
              )}
              <Menu anchorEl={anchorElm} open={open} onClose={handleClose} >
                <MenuItem onClick={handleClose} >Profile</MenuItem>
                <MenuItem onClick={handleClose} >Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;

//Ternary operator  refresher\\
// The conditional (ternary) operator is the only JavaScript
//  operator that takes three operands: a condition followed
//  by a question mark (?), then an expression to execute if
//  the condition is truthy followed by a colon (:), and finally
//  the expression to execute if the condition is falsy. This
//  operator is frequently used as an alternative to an if...else statement.
