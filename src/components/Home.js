import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import Loader from './Loader'

export default function Home() {
  const [state, setState] = useState({
    hotelsList: [],
  });
  useEffect(() => {
    console.log("cdm called of home")
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((hotelsList) =>
        setState((prevState) => ({
          ...prevState,
          hotelsList,
        }))
      );
  }, []);

  const { hotelsList } = state;
  return hotelsList.length === 0 ? (
    <Loader />
  ) : (
    <div>
      {hotelsList.map((hotelDetails) => (
        <HotelCard key={hotelDetails.hotelId} hotelDetails={hotelDetails} />
      ))}
    </div>
  );
}
