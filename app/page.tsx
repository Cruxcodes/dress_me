"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import useStore from "./store/store";

interface Weather {
  currentTemperature: number;
}
export default function Home() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const [checkingLocation, setCheckingLocation] = useState<boolean>(true);
  const [weatherDetails, setWeatherDetails] = useState<Weather | null>(null);

  // const { ai_response, test } = useStore();
  const test = useStore((state) => state.test);

  const getWeatherDetails = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location?.latitude}&lon=${location?.longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
    );
    const data = await response.json();
    setWeatherDetails({
      currentTemperature: Number(
        (parseFloat(data.main.temp) - 273.15).toFixed(2)
      ),
    });
    // console.log(data);
    console.log(data.weather[0].main + " " + data.weather[0].description);
  };

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      setFirstTime(false);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (location) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
          );
          const data = await response.json();
          setAddress(
            data.address.city + " " + data.address.country ||
              "Address not found"
          );
          getWeatherDetails();
          setCheckingLocation(false);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddress();
    }
  }, [location]);

  useEffect(() => {
    getUserLocation();
    console.log(test.another);
  }, []);

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    <div>
      <header>
        <h1 className="text-3xl font-bold underline">Dress Me</h1>
        <div>
          <p>Welcome</p>
          <button onClick={() => getUserLocation()}>Know my location</button>
        </div>
      </header>

      <p className="text-lg">Let's dress you.</p>

      {location ? (
        <p>You are currently in {address && `${address}`}</p>
      ) : (
        <p>Getting your location...</p>
      )}

      <p>Right now the weather is {weatherDetails?.currentTemperature}°</p>
    </div>
  );
}
