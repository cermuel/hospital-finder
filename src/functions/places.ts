import axios from "axios";

//@ts-ignore
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export const getPlaces = async ({
  lat,
  lng,
  setPlacesLoaded,
  setPlaces,
  setPlacesError,
}) => {
  const token = localStorage.getItem("amaka_token");

  setPlacesLoaded(false);
  if (lat !== undefined) {
    try {
      const places = await axios.post(
        "http://localhost:5001/",
        {
          latitude: lat,
          longitude: lng,
          //@ts-ignore
          key: API_KEY,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setPlaces(places.data.data);

      setPlacesLoaded(true);
    } catch (err) {
      let message = err?.response?.data || err?.message || "error occured";
      setPlacesError(message);
      setPlacesLoaded(true);
    }
  } else {
    return;
  }
};

//GEOCODING
export const getGeo = async ({ address }) => {
  try {
    const geo = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAIbBR-5m2yCBMnmrp2R2nZ0zRMqFHKtcQ`
    );
    if (geo.data.results.length > 0) {
      return geo.data.results[0].geometry.location;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

// const calculate = async () => {
//   if (
//     //   originRef.current?.value == "" ||
//     destinationRef.current?.value == "" ||
//     currentLocation == undefined
//   ) {
//     return;
//   }
//   const directionService = new google.maps.DirectionsService();

//   const result = await directionService.route({
//     //   origin: originRef.current.value,
//     origin: currentLocation,
//     destination: destinationRef.current.value,
//     travelMode: google.maps.TravelMode.DRIVING,
//   });
//   setDirectionResponse(result);
//   setDistance(result.routes[0].legs[0].distance.text);
//   setDuration(result.routes[0].legs[0].duration.text);
// };

//   const center = { lat: 8.14067, lng: 5.10204 };

export const getCurrentPosition = ({
  setCenter,
  setdefaultCenter,
  setCurrentLocation,
  setLocationError,
}) => {
  navigator.geolocation.getCurrentPosition(
    (e) => {
      const { latitude, longitude } = e.coords;
      setCenter({
        lat: latitude,
        lng: longitude,
      });
      setdefaultCenter({
        lat: e.coords.latitude,
        lng: e.coords.longitude,
      });
      setCurrentLocation(new google.maps.LatLng(latitude, longitude));
    },
    (err) => {
      setLocationError(err.message);
    }
  );
};
