import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, ButtonGroup, Typography, Button, Card, CardContent, CardActions } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Link } from "react-router-dom";
//import { Redirect } from "react-router"

const useStyles = makeStyles((theme) => ({
  paymentContainer: {
    width: "30%",
    margin: "auto",
    padding: theme.spacing(2),
    textAlign: "center",
    boxShadow: "0 6px 10px 0 rgb(125 125 125 / 10%)",
    fontWeight: "bold",
    zIndex: 20
  },
  root:{
      display: "flex",
      margin: 30
  },
  btnStyle:{
      backgroundColor:"green",
      width: "100%",
      marginTop: 20,
      '&:hover':{
          backgroundColor:"green"
      }
  },
  cardStyle: {
    minWidth: 400,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxIcon: {
    minWidth: 40,
    minHeight: 40,
    color: "green",
  },
}));

export default function Payment(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    hotelId: props.location.state.hotelId,
    name: props.location.state.name,
    price: props.location.state.price,
    image: props.location.state.image,
    totalPrice: props.location.state.price,
    guestCount: 1,
    roomCount: 1,
    requestSubmitted: false,
  });
  const { hotelId, name, price, image, totalPrice, guestCount, roomCount, requestSubmitted } = state;

  const incrementGuest = () => {
    setState((prevState) => ({
      ...prevState,
      guestCount: ++prevState.guestCount,
      roomCount:
        guestCount > 2 ? Math.ceil((guestCount + 1) / 3) : prevState.roomCount,
      totalPrice: `${
        Math.ceil((guestCount + 1) / 3) * parseInt(price.split(" ")[0])
      } INR `,
    }));
  };

  const decrementGuest = () => {
    if (guestCount > 1)
      setState((prevState) => ({
        ...prevState,
        guestCount: --prevState.guestCount,
        roomCount:
          guestCount > 2
            ? Math.ceil((guestCount - 1) / 3)
            : prevState.roomCount,
        totalPrice: `${
          Math.ceil((guestCount - 1) / 3) * parseInt(price.split(" ")[0])
        } INR `,
      }));
  };

  const incrementRoom = () => {
    setState((prevState) => ({
      ...prevState,
      roomCount: ++prevState.roomCount,
      totalPrice: `${(roomCount + 1) * parseInt(price.split(" ")[0])} INR `,
    }));
  };

  const decrementRoom = () => {
    if (roomCount > 1)
      setState((prevState) => ({
        ...prevState,
        roomCount:
          Math.ceil(prevState.guestCount / 3) < prevState.roomCount
            ? --prevState.roomCount
            : prevState.roomCount,
        totalPrice: `${(roomCount - 1) * parseInt(price.split(" ")[0])} INR `,
      }));
  };

  const handleSubmit = () => {
    //submit the booking details to server.
    const bookingId = Math.floor(100000 + Math.random() * 900000);
    const bookingInfo = {
      userInfo: {
        userId: "anshula128@gmail.com",
        username: "Anshul Agarwal",
      },
      bookingDetails: {
        bookingId,
        hotelId,
        guestCount,
        roomCount,
        totalPrice,
      },
    };

    let reqObj = {
      method: "POST",
      //credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    };
    fetch("http://localhost:3000/booking", reqObj).then((res) => {
      if (res.ok) {
        setState((prevState) => ({
          ...prevState,
          requestSubmitted: true,
        }));
      }
    });
  };
  return requestSubmitted ? (
    <Card className={classes.cardStyle} variant="outlined">
    <CheckBoxIcon className={classes.checkBoxIcon} />
    <CardContent>
      <Typography className={classes.successColor}>
        Request Submitted Successfully.
      </Typography>
      <CardActions>
        <Link
          to={{
            pathname: "/",
          }}
        >
          <Button size="medium" color="primary">
            Proceed to Home
          </Button>
        </Link>
      </CardActions>
    </CardContent>
  </Card>
  ) : (
      <div className={classes.root}>
      <img src={`http://localhost:3000/${image}`} alt="hotel-img" width= "50%" height= "100%" />
    <div className={classes.paymentContainer}>
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          
        >
          <Typography variant="h5" style={{fontWeight:"bold"}}>Booking Summary</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Hotel Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" style={{fontWeight:"bold"}}>{name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>No. of Guest</Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={decrementGuest}>-</Button>
            <p>{guestCount}</p>
            <Button onClick={incrementGuest}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Typography>No. of Rooms</Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup size="small" aria-label="small outlined button group">
            <Button onClick={decrementRoom}>-</Button>
            <p>{roomCount}</p>
            <Button onClick={incrementRoom}>+</Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Typography>Total Price</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" color="error" style={{fontWeight:"bold"}}>{totalPrice}</Typography>
        </Grid>
      </Grid>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="secondary"
        className={classes.btnStyle}
      >
        Make Payment
      </Button>
    </div>
    </div>
  );
}
