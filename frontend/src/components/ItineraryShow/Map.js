import React, { useRef, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useSelector } from 'react-redux';
import './Map.css'
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

function Map({itinerary, mapOptions }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const activityIds = useSelector(state => state.itineraries[itinerary._id].activities)
  const activities = useSelector(state => Object.values(state.activities).filter(activity => activityIds.includes(activity._id)))
  let currentWindow = null
   
  const allDates = activities.map(activity => activity.date);

  const uniqueDates = () => {
    let unique = [];
    allDates.forEach(date => {
      if (!unique.includes(date)) {
        unique.push(date)
      }
    })
    return unique
  }

  const colors = ["rgb(211,64,132)","rgb(172,222,238)", "rgb(237,106,192)","rgb(187,118,54)", "rgb(190,137,129)","rgb(86,147,92)","rgb(238,120,62)", "rgb(196,214,314)", "rgb(220,109,235)", "rgb(163,176,133)","rgb(104,153,182)","rgb(240,191,242)","rgb(161,226,141)","rgb(229,168,58)","rgb(227,73,73)","rgb(233,218,115)","rgb(227,138,107)", "rgb(93,198,222)","rgb(169,53,155)", "rgb(221,97,220)", "rgb(147,92,198)","rgb(140,148,245)","rgb(240,175,78)", "rgb(233,137,112)", "rgb(79,176,204)","rgb(188,107,124)","rgb(127,149,92)","rgb(206, 114,81)","rgb(125,75,70)","rgb(184,150,143)","rgb(218,150,143)","rgb(218, 186, 65)", "rgb(159,195,86)", "rgb(187,75,213)","rgb(180,246,122)","rgb(208,59,236)","rgb(215,240,84)",]
  
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
        zoom: 10,
        ...mapOptions, 
        
      });
      
      const markers = []
      const bounds = new window.google.maps.LatLngBounds();

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
            fillColor: `${colors[dates.indexOf(activity.date)%36]}`,
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
      markers.push(marker)
      bounds.extend(marker.getPosition()) 
      map.fitBounds(bounds);

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
  }, [JSON.stringify(activities), JSON.stringify(mapOptions)]);

  return (
    <>
        <div ref={mapRef} id="map" style={{ width: '100%', height: '100vh' }} />
    </>
  )
}

export default function MapWrapper(props) {
  return (
    <div id='mapcontainer'>
      <Wrapper>
        <Map {...props} />
      </Wrapper>
    </div>
  );
}
