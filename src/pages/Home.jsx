import React, { useLayoutEffect, useRef, useState } from "react";

import { MdLogout } from "react-icons/md";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaLocationArrow } from "react-icons/fa";
import Place from "../components/Place";
import { IoSearchSharp } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import Button from "../components/Button";
import { getCurrentPosition, getGeo, getPlaces } from "../functions/places";
import { useNavigate } from "react-router-dom";
import { LogoutFunc } from "../functions/auth";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("amaka_user"));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_API_KEY,
    libraries: ["places"],
  });
  const [defaultCenter, setdefaultCenter] = useState({});
  const [center, setCenter] = useState({});
  const [locationError, setLocationError] = useState("");
  const [placesError, setPlacesError] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (undefined));
  const [selectedDistance, setselectedDistance] = useState("");
  const [selectedDuration, setselectedDuration] = useState("");
  const [directionResponse, setDirection] = useState(null);
  const [currentLocation, setCurrentLocation] = useState();
  const [places, setPlaces] = useState([]);
  const [placesLoaded, setPlacesLoaded] = useState(true);
  const originRef = useRef(null);

  //Get current location
  useLayoutEffect(() => {
    getCurrentPosition({
      setCenter,
      setCurrentLocation,
      setdefaultCenter,
      setLocationError,
    });
  }, []);

  const change = async () => {
    if (originRef.current.value !== "") {
      setCurrentLocation(originRef.current.value);
      let geo = await getGeo(originRef.current.value);
      getPlaces({
        lat: geo.lat,
        lng: geo.lng,
        setPlaces,
        setPlacesError,
        setPlacesLoaded,
      });
    } else {
      return;
    }
  };

  const reset = () => {
    getPlaces({
      lat: center.lat,
      lng: center.lng,
      setPlaces,
      setPlacesError,
      setPlacesLoaded,
    });
    setCurrentLocation(new google.maps.LatLng(center.lat, center.lng));
  };

  //UI
  if (user) {
    if (
      !isLoaded ||
      !placesLoaded ||
      (center.lat == undefined && locationError == "")
    ) {
      return <Loader />;
    }
    if (locationError !== "" || placesError !== "") {
      return <Error message={locationError} />;
    } else if (places.length == 0) {
      return (
        <main className="w-screen h-screen flex flex-col justify-center items-center bg-pry-light">
          <h1 className="text-center capitalize font-bold text-white text-5xl max-md:text-3xl">
            Welcome {user.name}!
          </h1>
          <div className="w-full max-w-[150px]">
            <Button
              props={{
                title: "Get Hospitals",
                isLoading: !placesLoaded,
                onClick: () =>
                  getPlaces({
                    lat: center.lat,
                    lng: center.lng,
                    setPlaces,
                    setPlacesError,
                    setPlacesLoaded,
                  }),
              }}
            />
          </div>
        </main>
      );
    } else if (directionResponse == null && places.length > 0) {
      return (
        <main className="w-screen h-screen overflow-hidden relative bg-pry-light">
          <h1 className="w-full text-center md:text-5xl text-3xl font-extrabold text-pry my-4">
            Hospital <span className="text-white"> Finder</span>
          </h1>
          <div className="w-full justify-center flex">
            <div className="items-center gap-4 flex">
              <Autocomplete>
                <input
                  type="text"
                  className="w-[250px] outline-none text-sm px-2 py-2 rounded-md border-[1px]"
                  placeholder="Change Location"
                  ref={originRef}
                />
              </Autocomplete>
              <button
                onClick={change}
                className="text-xl text-white bg-pry p-[7px] rounded-md"
              >
                <IoSearchSharp />
              </button>
              <button
                onClick={reset}
                className="text-xl text-white bg-pry p-[7px] rounded-md"
              >
                <RxReset />
              </button>
            </div>
          </div>
          <section className="w-full pb-40 flex flex-wrap overflow-scroll h-full justify-around p-4 gap-4">
            {places.map((place) => {
              return (
                <Place
                  place={place}
                  currentLocation={currentLocation}
                  setDirection={setDirection}
                  setselectedDistance={setselectedDistance}
                  setselectedDuration={setselectedDuration}
                />
              );
            })}
          </section>
        </main>
      );
    } else {
      return (
        <main className="w-screen h-screen relative bg-pry-light">
          <GoogleMap
            center={center}
            zoom={20}
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
          <div className="md:w-[500px] w-[90%] bg-white absolute top-10 space-y-2 rounded-xl px-5 py-3 pt-5 rounded-t-none left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
            <section className="w-full flex items-center justify-between">
              <button
                onClick={() => setDirection(null)}
                className="bg-pry w-[25%] rounded-md text-white py-1"
              >
                Back
              </button>
              <div className="flex items-center gap-4">
                <FaLocationArrow
                  className="text-pry"
                  onClick={() => {
                    setCenter(defaultCenter);
                    map.panTo(defaultCenter);
                    map.setZoom(20);
                  }}
                />
                <MdLogout
                  className="bg-pry text-white py-2 rounded-md text-3xl"
                  onClick={() => LogoutFunc({ navigate })}
                />
              </div>
            </section>
            <section className="w-full flex items-center justify-between">
              <p
                type="text"
                className="font-medium max-md:text-sm"
                placeholder="Origin"
              >
                Distance:{" "}
                <span className="font-normal">{selectedDistance}</span>
              </p>
              <p
                type="text"
                className="font-medium max-md:text-sm"
                placeholder="Destination"
              >
                Duration:{" "}
                <span className="font-normal">{selectedDuration}</span>
              </p>
            </section>
          </div>
        </main>
      );
    }
  } else {
    return (
      <main className="w-screen h-screen flex flex-col justify-center items-center bg-pry-light">
        <h1 className="text-center capitalize font-bold text-white text-5xl max-md:text-3xl">
          You are not logged in
        </h1>
        <div className="w-full max-w-[150px]">
          <Button
            props={{
              title: "Login",
              onClick: () => {
                navigate("/");
              },
            }}
          />
        </div>
      </main>
    );
  }
};

export default Home;
