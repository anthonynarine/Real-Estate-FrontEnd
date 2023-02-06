import { React, useState, useContext } from "react";
import { AppBar,Button,Toolbar,Typography,useMediaQuery,useTheme,Menu,MenuItem,} from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import VillaIcon from "@mui/icons-material/Villa";
import NavBarDrawer from "./NavBarDrawer";
import { Link, useNavigate } from "react-router-dom";

// context
import StateContex from "../contex/StateContex";
import DispatchContex from "../contex/DispatchContex";

//icons
import { KeyboardDoubleArrowDown, Home } from "@mui/icons-material";
import axios from "axios";

//array of tabs used in navbar
const navBarTabs = ["Home", "Agencies", "Listings"];

//NAVBAR STYLES START\\
const NavBarStyles = {
  loginBtn: {
    backgroundColor: "#79B2BE",
    color: "#22ffe9",
    width: "7rem",
    fontSize: ".9rem",
    marginLeft: 1.5,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#22ffe9",
      color: "#f638dc",
    },
  },
  addPropertyBtn: {
    backgroundColor: "#79B2BE",
    color: "#22ffe9",
    width: "12rem",
    fontSize: ".9rem",
    marginLeft: "auto",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#22ffe9",
      color: "#f638dc",
    },
  },
  dropDownMenuItem1: {
    width: "7rem",
    borderRadius: "15px",
    backgroundColor: "white",
    color: "#22ffe9",
    marginBottom: ".25rem",
    "&:hover": {
      backgroundColor: "#9E87A3",
    },
  },
};
//NAVBAR STYLES END\\

//make sure to set this useState value to false or it will get mad and throw and error.
function NavBar({ tabs }) {
  const [value, setValue] = useState(false);

  const navigate = useNavigate();

  const GlobalState = useContext(StateContex);
  const GlobalDispatch = useContext(DispatchContex);

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
  const open = Boolean(anchorElm);
  const handleClick = (event) => {
    setAnchorElm(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElm(null);
  };

  // LOGOUT REQUEST WITH TO DELETE USER INFO FROM LOCAL STORAGE START
  async function handleLogout(event) {
    setAnchorElm(null);

    const confirmLogout = window.confirm("Are you sure you want to log off?");
    if (confirmLogout) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api-auth-djoser/token/logout/",
          GlobalState.userToken,
          { headers: { Authorization: "Token ".concat(GlobalState.userToken) } }
        );
        console.log(response);
        GlobalDispatch({ type: "logout" });
        navigate("/");
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  // LOGOUT REQUEST WITH TO DELETE USER INFO FROM LOCAL STORAGE END

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
                LinkComponent={Link}
                to="/addproperty"
                sx={NavBarStyles.addPropertyBtn}
                variant="contained"
                startIcon={<Home />}
              >
                <Typography varient="h1">Add Property</Typography>
              </Button>
              {/* Button will be conditionally render to show user name if logged in
               or the login button if not. this is done by using GlobalState and the
               ternery statement that checks if the userUsername state value is empty.
                 */}
              {GlobalState.userIsLoggedIn ? (
                <Button
                  LinkComponent={Link}
                  to="/login"
                  sx={NavBarStyles.loginBtn}
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
                  sx={NavBarStyles.loginBtn}
                  variant="contained"
                  startIcon={<KeyboardDoubleArrowDown />}
                >
                  <Typography>Login</Typography>
                </Button>
              )}

              <Menu
                id="basic-button"
                anchorEl={anchorElm}
                open={open}
                onClose={handleClose}
                variant="selectedMenu"
              >
                <MenuItem
                  sx={NavBarStyles.dropDownMenuItem1}
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  sx={NavBarStyles.dropDownMenuItem1}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
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
