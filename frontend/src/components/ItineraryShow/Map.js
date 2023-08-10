import React, { useRef, useEffect, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useSelector } from 'react-redux';
import './Map.css'
import { faLocationDot, faLocationPin } from "@fortawesome/free-solid-svg-icons";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function Map({itinerary, mapOptions }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const activityIds = useSelector(state => state.itineraries[itinerary._id].activities)
  const activities = useSelector(state => Object.values(state.activities).filter(activity => activityIds.includes(activity._id)))
  let currentWindow = null
   
  const allDates = activities.map(activity => activity.date);

  const allColors = () => {
    let colors = []
    let times = allDates.length;
    for(let i = 0; i < times; i++){
      colors.push(Math.floor(Math.random()*16777215).toString(16))
    }
    return colors
  }

  const uniqueDates = () => {
    let unique = [];
    allDates.forEach(date => {
      if (!unique.includes(date)) {
        unique.push(date)
      }
    })
    return unique
  }
  const colors = allColors();
  const dates = uniqueDates();

  useEffect(() => {
    if (mapRef.current === null) return;

    if (activities.length < 1) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.71427, lng: -74.00597}, 
        zoom: 10,
        ...mapOptions, 
      });
    } else if (activities.length >= 1){
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: activities[0].place.location.lat, lng: activities[0].place.location.lng}, 
        zoom: 9,
        ...mapOptions, 
      });

      for (const activity of activities) {

        let contentString = document.createElement('div')
        contentString.innerHTML = `<img id="infowindow-image" src=${activity.place.photo}></img>
        <h3> ${activity.title} </h3>`

        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });

        const marker = new window.google.maps.Marker({
          position: { lat: activity.place.location.lat, lng: activity.place.location.lng },
          map,
          title: activity.title,
          icon: {
            path: faLocationPin.icon[4],
            fillColor: `#${colors[dates.indexOf(activity.date)]}`,
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.06,
            labelOrigin: new window.google.maps.Point(200, 200)
          },
          label: {
            text: `${dates.indexOf(activity.date) + 1}`,
            fontWeight: 'bold',
            fontSize: '13px',
          }
        }
      );

      marker.addListener("click", () => {
        if (currentWindow != null) {
          currentWindow.close()
        }
        infowindow.open({
          anchor: marker,
          map,
        });
        currentWindow = infowindow;
      })

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
      }
    }
    
    return () => {
      markersRef.current = {};
    };
  }, [activities, mapOptions]);

  return (
    <>
        <div ref={mapRef} id="map" style={{ width: '100%', height: '150vh' }} />
    </>
  )
}

export default function MapWrapper(props) {
  return (
    <div id='mapcontainer'>
    <Wrapper apiKey={apiKey}>
      <Map {...props} />
    </Wrapper>
    </div>
  );
}
