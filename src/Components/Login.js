import {
  Alert,
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = ({loginHandler,handleChange}) => {
  const paperStyle = {
    padding: 20,
    height: 290,
    width: "350px",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "purple", margin: "0px 155px" };
  const headerStyle = { margin: "0", textAlign: "center" };
  const marginTop = { marginTop: "8px" };
  const buttonStyle = {
    borderRadius: "10px",
    width: "100px",
    height: "40px",
    margin: "auto",
    marginTop: "15px",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(0);

  const [alert, setAlert] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    }),
    onSubmit: (value,e) => {
      setEmail(value.email);
      setPassword(value.password);

      // console.log(value, "formik");
      const data1 = JSON.parse(localStorage.getItem("List")) || [];
      //console.log(data1);
      const user = data1.find(
        (u) => u.email === value.email && u.password === value.password
      );
      if (user) {
        // console.log(user.userName);
        setIsSubmitted(1);
        sessionStorage.setItem("isLoggedIn",JSON.stringify(1));
        sessionStorage.setItem("User", JSON.stringify(value));
        sessionStorage.setItem("userName", JSON.stringify(user.userName));
        loginHandler();
        handleChange(e,0);
      } else {
        setIsSubmitted(-1);
      }

      setTimeout(() => {
        setIsSubmitted(0);
      }, 3000);

      formik.resetForm();
    },
  });
  return (
    <>
      {isSubmitted === 1 && (
        <Alert severity="success">Sign In Successfully</Alert>
      )}
      {isSubmitted === -1 && (
        <Alert severity="error">Email or Password is wrong</Alert>
      )}
      <Grid>
        <Paper style={paperStyle} elevation={12}>
          <h2 style={headerStyle}>Log In</h2>
          <Typography variant="heading" sx={{ textAlign: "center" }}>
            Login With Us
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={marginTop}
              id="outlined-basic"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            ></TextField>
            <TextField
              style={marginTop}
              id="outlined-basic"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            ></TextField>

            <Button
              style={buttonStyle}
              variant="outlined"
              type="submit"
              color="secondary"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
