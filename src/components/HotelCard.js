import React from "react";
import { Button, Typography }from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
   display: "flex",
   justifyContent: "space-between",
   margin: 30
  },
  container:{
    display: "flex",
   justifyContent: "space-between"
  },
  btnStyle:{
    marginTop: 20,
    backgroundColor: "green",
    '&:hover':{
      backgroundColor: "green"
    }
  }
}));

function HotelCard({ hotelDetails }) {
  const classes = useStyles();
  const {
    hotelId,
    name,
    address,
    rating,
    totalRatings,
    services,
    price,
    image,
  } = hotelDetails;

  return (
    <div className={classes.root}>
    <div className={classes.container}>
      <img src={`http://localhost:3000/${image}`} alt="hotel-img" width="300" height="200" />
      <div className="hotel-details" style={{marginLeft: 20}}>
        <Typography variant="h5" style={{fontWeight: "bold"}}>{name}</Typography>
        <Typography>{address}</Typography><br/>
        <Typography>{JSON.stringify(services)}</Typography>
        <Typography variant="h6" color="error" style={{fontWeight:"bold", marginTop: 20}}>{price}</Typography>
      </div>
      </div>
      <div className="ratings">
        <Typography variant="h6">Total Ratings: {totalRatings}</Typography>
        <Typography variant="h6">Rating: {rating}</Typography>
      <Link style={{textDecoration: "none"}} to={{
        pathname:"/payment",
        state:{
          hotelId,
          name,
          price,
          image
        }
      }}><Button variant="contained" color="primary" className={classes.btnStyle}>
        Request to Book
      </Button>
      </Link>
      </div>
    </div>
  );
}

export default HotelCard;
