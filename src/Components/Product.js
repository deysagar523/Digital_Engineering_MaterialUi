import {
  CardActionArea,
  CardMedia,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import React from "react";
import { products } from "../Constants/ProductConstant";
import { makeStyles } from "@mui/styles";
const Product = () => {
  // const useStyles = makeStyles({
  //   root: {
  //     height: "100%",
  //     maxWidth: "60%",
  //   },
  //   media: {
  //     height: 150,
  //   },
  // });
  // const classes = useStyles();
  return (
    <>
      <Grid
        layout="row"
        container
        marginTop="10%"
        spacing={5}
        paddingLeft="30px"
        paddingRight="30px"
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} lg={3}>
            <Card >
              <CardActionArea>
                <CardMedia
                  //   className={classes.media}

                  sx={{
                    height: "150px",
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "block",
                  }}
                  image={product.img}
                ></CardMedia>
              </CardActionArea>

              <Typography variant="h6" component="h2">
                {product.header}
              </Typography>
              <Typography variant="h6" component="p">
                {product.content}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Product;
