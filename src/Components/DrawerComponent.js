import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState } from "react";

const DrawerComponent = ({ handleChange, logoutHandler, isLoggedIn }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const tabs = [
    "Home",
    "About Us",
    "Services",
    "Products",
    "Contact Us",
    "Login",
    "Sign Up",
  ];
  const tabsLogin = [
    "Home",
    "About Us",
    "Services",
    "Products",
    "Contact Us",
    "Log out",
  ];
  console.log(isLoggedIn);
  const logout = () => {
    logoutHandler();
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        {isLoggedIn ? (
          <List>
            {tabsLogin.map((tab, index) => (
              <ListItemButton key={index}>
                <ListItemIcon>
                  {index === tabsLogin.length - 1 ? (
                    <ListItemText onClick={logout}>{tab}</ListItemText>
                  ) : (
                    <ListItemText
                      onClick={(e) => {
                        handleChange(e, index);
                      }}
                    >
                      {tab}
                    </ListItemText>
                  )}
                </ListItemIcon>
              </ListItemButton>
            ))}

            {/* <Button startIcon={<LogoutIcon />} onClick={logout}>
              Log out
            </Button> */}
          </List>
        ) : (
          <List>
            {tabs.map((tab, index) => (
              <ListItemButton key={index}>
                <ListItemIcon>
                  <ListItemText
                    onClick={(e) => {
                      handleChange(e, index);
                    }}
                  >
                    {tab}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))}
          </List>
        )}
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
