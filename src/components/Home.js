import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import HotelCard from "./HotelCard";

function Home() {
  const [state, setState] = useState({
    hotelsList: [],
    hotelId: "",
    name: "",
    price: "",
    bookNowStatus: false,
  });
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((hotelsList) =>
        setState((prevState) => ({
          ...prevState,
          hotelsList,
        }))
      );
  }, []);

  const handleBookNow = (hotelId, name, price, image) => {
    setState((prevState) => ({
      ...prevState,
      hotelId,
      name,
      price,
      image,
      bookNowStatus: true,
    }));
  };
  const { hotelsList, bookNowStatus, hotelId, name, price, image } = state;
  return bookNowStatus ? (
    <Redirect
      to={{
        pathname: "/payment",
        state: {
          hotelId,
          name,
          price,
          image
        },
      }}
    />
  ) : (
    <div>
      {hotelsList.map((hotelDetails) => (
        <HotelCard
          key={hotelDetails.hotelId}
          hotelDetails={hotelDetails}
          handleBookNow={handleBookNow}
        />
      ))}
    </div>
  );
}

export default Home;
