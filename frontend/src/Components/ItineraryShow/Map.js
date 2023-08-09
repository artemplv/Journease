import React, { useRef, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Map({ activities, mapOptions }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (mapRef.current === null) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 44, lng: 44}, 
      zoom: 13,
      ...mapOptions, 
    });

    return () => {
      markersRef.current = {};
    };
  }, [activities, mapOptions]);

  return (
    <>
        <div ref={mapRef} id="map" style={{ width: '100%', height: '100vh' }} />
    </>
  )
}

console.log(process.env)

export default function MapWrapper(props) {
  return (
    <div id='mapcontainer'>
    <Wrapper apiKey={apiKey}>
      <Map {...props} />
    </Wrapper>
    </div>
  );
}
