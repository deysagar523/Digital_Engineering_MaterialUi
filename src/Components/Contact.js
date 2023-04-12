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

const Contact = () => {
  const paperStyle = {
    padding: 20,
    height: 500,
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
  const [feedback, setFeedback] = useState("");
  const [arr, setArr] = useState([]);
  const [alert, setAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: userName,
      email: email,
      feedback: feedback,
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("username is required"),
      email: Yup.string().email().required("email is required"),
      feedback: Yup.string().required("feedback is required"),
    }),
    onSubmit: (value) => {
      setUserName(value.userName);
      setEmail(value.email);
      setFeedback(value.feedback);
      console.log(value, "formik");
      const newArr = arr;
      newArr.push(value);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setArr(newArr);
      localStorage.setItem("Arr", JSON.stringify(newArr));
      formik.resetForm();
    },
  });
  return (
    <>
      {alert && <Alert severity="success">Feedback Submitted</Alert>}

      <Grid>
        <Paper style={paperStyle} elevation={12}>
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Contact Us</h2>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Fill the form given below
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
              name="feedback"
              label="Feedback"
              value={formik.values.feedback}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.feedback && formik.errors.feedback)}
              helperText={formik.touched.feedback && formik.errors.feedback}
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

export default Contact;
