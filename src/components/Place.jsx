import React, { useEffect, useLayoutEffect, useState } from "react";
import { PiCarBold } from "react-icons/pi";
import { FaLocationDot } from "react-icons/fa6";
import { truncateString } from "../utils/index";
const Place = ({
  place,
  currentLocation,
  setDirection,
  setselectedDistance,
  setselectedDuration,
  originRef,
}) => {
  const { lat, lng } = place.geometry.location;

  const placeLocation = new google.maps.LatLng(lat, lng);

  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [mainDuration, setmainDuration] = useState(
    `${duration} to destination`
  );
  const [directionResponse, setDirectionResponse] = useState();

  const directionService = new google.maps.DirectionsService();

  const getDetails = async () => {
    const result = await directionService.route({
      //   origin: originRef.current.value,
      origin: currentLocation,
      destination: placeLocation,
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };

  useLayoutEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    setmainDuration(`${duration} to destination`);
  }, [duration]);

  return (
    <div
      className="flex md:w-[45%] rounded-lg my-4 p-4 gap-4 h-40 bg-white"
      key={place.place_id}
    >
      <img
        src="https://th-thumbnailer.cdn-si-edu.com/sS4lnqY5-rTIlRDsH5qxQTKkllY=/800x600/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/b4/c6/b4c65fd0-01ba-4262-9b3d-f16b53bca617/istock-172463472.jpg"
        alt=""
        className="h-full rounded-md max-md:w-[40%] object-cover"
      />
      <div className="h-full flex flex-col items-start gap-2">
        <h2 className="font-semibold text-pry line-clamp-1">{place.name}</h2>
        {/* <h2 className="font-medium text-pry">
          Rating: <span className=""></span>
          {place.rating}
        </h2> */}
        <h2 className="font-medium text-pry text-sm flex items-center gap-1 truncate">
          <PiCarBold />
          {truncateString(mainDuration, 25)}
        </h2>
        <h2 className="font-medium text-pry text-sm flex items-center gap-1">
          <FaLocationDot />
          {distance} Away
        </h2>
        <button
          className="bg-pry text-white text-xs rounded-md font-bold px-5 py-1"
          onClick={() => {
            setselectedDistance(distance);
            setselectedDuration(duration);
            setDirection(directionResponse);
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default Place;
