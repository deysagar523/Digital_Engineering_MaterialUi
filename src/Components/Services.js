import React from "react";
import { Grid, Paper, Card, CardContent, Typography } from "@mui/material";
import { services } from "../Constants/ServiceConstants";
import { makeStyles } from "@mui/styles";

const Services = () => {
  // const useStyles = makeStyles({
  //   section: {
  //     textAlign: "center",
  //     height: "100%",
  //   },
  // });

  // const classes = useStyles();
  return (
    <>
      <Grid
        layout="row"
        container
        spacing={5}
        marginTop="20px"
        paddingLeft="30px"
        paddingRight="30px"
      >
        {services.map((service) => (
          <Grid item xs={12} sm={3}>
            <Paper>
              <Card>
                <Grid>
                  <img
                    src={service.img}
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  />
                </Grid>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {service.header}
                  </Typography>
                  <Typography variant="h6" component="p">
                    {service.content}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Services;
