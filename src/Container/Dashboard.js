import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Home from "../Components/Home";
import About from "../Components/About";
import Services from "../Components/Services";
import Product from "../Components/Product";
import Contact from "../Components/Contact";
import DrawerComponent from "../Components/DrawerComponent";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
      ? JSON.parse(sessionStorage.getItem("isLoggedIn"))
      : 0
  );
  const [currentTab, setCurrentTab] = useState(
    sessionStorage.getItem("currentTab")
      ? JSON.parse(sessionStorage.getItem("currentTab"))
      : 0
  );

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (e, val) => {
    setValue(val);
    setCurrentTab(val);
    sessionStorage.setItem("currentTab", JSON.stringify(val));
  };
  const TabPanel = (props) => {
    const { children, value, index } = props;
    // console.log(value,index);
    return (
      <div>
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };
  const logoutHandler = () => {
    sessionStorage.removeItem("User");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userName");
    setIsLoggedIn(0);
  };
  const loginHandler = () => {
    setIsLoggedIn(1);
  };
  return (
    <>
      <AppBar sx={{ background: "red" }} position="static">
        <Toolbar>
          {isMatch ? (
            <>
              <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
                <DashboardIcon />
              </IconButton>
              {/* <DashboardIcon sx={{ transform: "scale(1.5)", marginRight: "20px" }} /> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
                Dashboard
              </Typography>
              <DrawerComponent
                handleChange={handleChange}
                logoutHandler={logoutHandler}
                isLoggedIn={isLoggedIn}
              />
            </>
          ) : (
            <>
              <IconButton size="large" color="inherit" sx={{ mr: 1 }}>
                <DashboardIcon />
              </IconButton>
              {/* <DashboardIcon sx={{ transform: "scale(1.5)", marginRight: "20px" }} /> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
                Dashboard
              </Typography>
              <Tabs
                textColor="white"
                indicatorColor="primary"
                sx={{ marginBottom: "1%", paddingTop: "1%" }}
                value={currentTab}
                onChange={handleChange}
              >
                <Tab label="Home"></Tab>
                <Tab label="About Us"></Tab>
                <Tab label="Services"></Tab>
                <Tab label="Producs"></Tab>
                <Tab label="Contact Us"></Tab>
              </Tabs>
              {isLoggedIn ? (
                <>
                  <Button onClick={logoutHandler} variant="contained">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    onClick={(e) => {
                      handleChange(e, 5);
                    }}
                    variant="contained"
                    style={{marginRight:"1rem"}}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={(e) => {
                      handleChange(e, 6);
                    }}
                    variant="contained"
                  >
                    SignUp
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <TabPanel value={currentTab} index={0}>
          <Home isLoggedIn={isLoggedIn} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <About />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <Services />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <Product />
        </TabPanel>
        <TabPanel value={currentTab} index={4}>
          <Contact />
        </TabPanel>
        <TabPanel value={currentTab} index={5}>
          <Login loginHandler={loginHandler} handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={currentTab} index={6}>
          <SignUp handleChange={handleChange} />
        </TabPanel>
      </div>
    </>
  );
};

export default Dashboard;
