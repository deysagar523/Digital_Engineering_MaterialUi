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
import { Link } from "react-router-dom";

const DrawerComponent = ({ handleLinkClick, logoutHandler, isLoggedIn }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const tabs = [
    {
      to: "/",
      element: "Home",
    },
    {
      to: "/about",
      element: "About Us",
    },
    {
      to: "/services",
      element: "Services",
    },

    {
      to: "/products",
      element: "Products",
    },
    {
      to: "/contact",
      element: "Contact Us",
    },
    {
      to: "/login",
      element: "Login",
    },
    {
      to: "/signup",
      element: "Signup",
    },
  ];

  const tabsLogin = [
    {
      to: "/",
      element: "Home",
    },
    {
      to: "/about",
      element: "About Us",
    },
    {
      to: "/services",
      element: "Services",
    },

    {
      to: "/products",
      element: "Products",
    },
    {
      to: "/contact",
      element: "Contact Us",
    },
    {
      to: "/login",
      element: "Log Out",
    },
  ];
  // console.log(isLoggedIn);
  const logout = (link) => {
    logoutHandler();
    handleLinkClick(link);
  };
  const clickHandler = (link) => {
    handleLinkClick(link);
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
                {index === tabsLogin.length - 1 ? (
                  <Link to={tab.to} onClick={() => logout(tab.to)}>
                    <ListItemIcon>
                      <ListItemText>{tab.element}</ListItemText>
                    </ListItemIcon>
                  </Link>
                ) : (
                  <Link to={tab.to} onClick={() => clickHandler(tab.to)}>
                    <ListItemIcon>
                      <ListItemText>{tab.element}</ListItemText>
                    </ListItemIcon>
                  </Link>
                )}
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
                <Link to={tab.to} onClick={() => clickHandler(tab.to)}>
                  <ListItemIcon>
                    <ListItemText>{tab.element}</ListItemText>
                  </ListItemIcon>
                </Link>
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
