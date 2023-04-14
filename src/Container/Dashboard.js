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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "../Components/Home";
import About from "../Components/About";
import Services from "../Components/Services";
import Product from "../Components/Product";
import Contact from "../Components/Contact";
import DrawerComponent from "../Components/DrawerComponent";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import AntdForm from "../Components/AntdForm";
import "../App.css";

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
      ? JSON.parse(sessionStorage.getItem("isLoggedIn"))
      : 0
  );
  // const [currentTab, setCurrentTab] = useState(
  //   sessionStorage.getItem("currentTab")
  //     ? JSON.parse(sessionStorage.getItem("currentTab"))
  //     : 0
  // );
  const [activeLink, setActiveLink] = useState(
    sessionStorage.getItem("link") ? sessionStorage.getItem("link") : "/"
  );

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // const handleChange = (e, val) => {
  //   setValue(val);
  //   setCurrentTab(val);
  //   sessionStorage.setItem("currentTab", JSON.stringify(val));
  // };
  // const linkStyle = {
  //   color: "white",
  //   textDecoration: "none",
  //   marginRight: "20px",
  //   ":hover": {
  //     color: "blue",
  //   },
  // };
  // const activeLinkStyle = {
  //   fontWeight: "bold",
  // };
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
  const redirectToLoginHandler = (link) => {
    loginHandler();
    handleLinkClick(link);
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
    sessionStorage.setItem("link", link);
  };
  return (
    <Router>
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
                handleLinkClick={handleLinkClick}
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
              {/* <Tabs
                textColor="white"
                indicatorColor="primary"
                sx={{ marginBottom: "1%", paddingTop: "1%" }}
                value={currentTab}
                onChange={handleChange}
              > */}
              <Link
                to="/"
                exact
                onClick={() => handleLinkClick("/")}
                className={activeLink === "/" ? "link active" : "link "}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => handleLinkClick("/about")}
                className={activeLink === "/about" ? "link active" : "link "}
              >
                About Us
              </Link>

              <Link
                to="/services"
                onClick={() => handleLinkClick("/services")}
                className={activeLink === "/services" ? "link active" : "link "}
              >
                Services
              </Link>

              <Link
                to="/products"
                onClick={() => handleLinkClick("/products")}
                className={activeLink === "/products" ? "link active" : "link "}
              >
                Products
              </Link>

              <Link
                to="/contact"
                onClick={() => handleLinkClick("/contact")}
                className={activeLink === "/contact" ? "link active" : "link "}
              >
                Contact Us
              </Link>
              <Link
                to="/antd"
                onClick={() => handleLinkClick("/antd")}
                className={activeLink === "/antd" ? "link active" : "link "}
              >
                AntdForm
              </Link>
              {/* <Tab label="Home"></Tab>
                <Tab label="About Us"></Tab>
                <Tab label="Services"></Tab>
                <Tab label="Producs"></Tab>
                <Tab label="Contact Us"></Tab> */}
              {/* </Tabs> */}
              {isLoggedIn ? (
                <>
                  <Button onClick={logoutHandler} variant="contained">
                    <NavLink
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() => redirectToLoginHandler("/login")}
                    >
                      Log Out
                    </NavLink>
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    // onClick={(e) => {
                    //   handleChange(e, 5);
                    // }}
                    variant="contained"
                    style={{ marginRight: "1rem" }}
                  >
                    <NavLink
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() => handleLinkClick("/login")}
                    >
                      Log In
                    </NavLink>
                  </Button>
                  <Button
                    // onClick={(e) => {
                    //   handleChange(e, 6);
                    // }}
                    variant="contained"
                  >
                    <NavLink
                      to="/signup"
                      style={{ textDecoration: "none", color: "white" }}
                      onClick={() => handleLinkClick("/signup")}
                    >
                      Sign Up
                    </NavLink>
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* <div>
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
      </div> */}
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} exact />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/products" element={<Product />} />

        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            <Login
              loginHandler={loginHandler}
              handleLinkClick={handleLinkClick}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUp handleLinkClick={handleLinkClick} />}
        />
        <Route path="/antd" element={<AntdForm />} />
      </Routes>
    </Router>
  );
};

export default Dashboard;
