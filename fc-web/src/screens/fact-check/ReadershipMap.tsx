import React, { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  height: 500,
  width: "100%",
  borderRadius: 16,
};

const center = {
  lat: 0,
  lng: 0,
};

let mapOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  draggable: false,
  gestureHandling: "cooperative" as "cooperative",
  minZoom: 1,
};

const ReadershipMap = () => {
  const intl = useIntl();
  const [, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new google.maps.LatLngBounds(new google.maps.LatLng(180, -180), new google.maps.LatLng(-180, 180));
    map.fitBounds(bounds, 0);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(_) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} language={intl.locale}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={0}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default ReadershipMap;
