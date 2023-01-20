import { React, useState } from "react";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";


const NavBarDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerTabs = ["Agencies", "Listings", "Add Property", "Login", "Logout"]

  const drawerCloseHandler = (event) => {
    setOpenDrawer(false)
  };

  const drawerOpenhandler = (event) => {
    setOpenDrawer(!openDrawer)
  };

  return (
    <>
      <Drawer open={openDrawer} onClose={drawerCloseHandler}>
        <List>
          {
            drawerTabs.map((tab, index)=>(
          <ListItemButton key={index} onClick={drawerCloseHandler} >
            <ListItemIcon>
              <ListItemText>{tab}</ListItemText>
            </ListItemIcon>
          </ListItemButton>
            ))
          }
        </List>
      </Drawer>
      <IconButton sx={{color: '#760fbf', marginLeft: "auto"}} onClick={drawerOpenhandler}><MenuRoundedIcon/></IconButton>
    </>
  );
};

export default NavBarDrawer;
