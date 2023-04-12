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

const SignUp = ({ handleChange }) => {
  const paperStyle = {
    padding: 20,
    height: 550,
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

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [arr, setArr] = useState(
    localStorage.getItem("List") == undefined
      ? []
      : JSON.parse(localStorage.getItem("List"))
  );
  const [alert, setAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phone: phone,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(
          /^(?:(?:\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/,
          "Phone number must be a valid Indian phone number"
        ),
    }),
    onSubmit: (value,e) => {
      setUserName(value.userName);
      setEmail(value.email);
      setPassword(value.password);
      setConfirmPassword(value.confirmPassword);
      setPhone(value.phone);
      console.log(value, "formik");
      const newArr = arr;
      newArr.push(value);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setArr(newArr);
      localStorage.setItem("List", JSON.stringify(newArr));
      handleChange(e,5);
      formik.resetForm();
    },
  });
  return (
    <>
      {alert && <Alert severity="success">Form Submitted</Alert>}
      <Grid>
        <Paper style={paperStyle} elevation={12}>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="heading" sx={{ textAlign: "center" }}>
            Sign Up With Us
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              style={marginTop}
              id="outlined-basic"
              name="userName"
              label="Username"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.userName && formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              fullWidth
            ></TextField>
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            ></TextField>
            <TextField
              style={marginTop}
              id="outlined-basic"
              name="confirmPassword"
              label="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.confirmPassword && formik.errors.confirmPassword
              )}
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              fullWidth
            ></TextField>
            <TextField
              style={marginTop}
              id="outlined-basic"
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
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

export default SignUp;
