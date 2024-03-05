"use client";
// AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI
// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import  EventMarker from './EventMarker';
import { getLocations } from '@/lib/Service';


// Define the React component (following naming convention)
function Page() {
  // curr position
  const position = { lat: 43.0722, lng: -89.4008 };

  const [locations, setLocations] = useState([] as any[]);
  
  // Dummy data
  let events = require('../../data/dummy_data.json').Events;

  // Fetch locations data
  useEffect(() => {
    getLocations().then((data) => {
      setLocations(data);
      console.log(data);
    });
  }, []);

  // user points
  const [points, setPoints] = useState(0);

  return (
    // Wrap the Map component with APIProvider and provide the API key
    <>
      {/* <p >POINTS</p> */}
      <div style={{position: 'fixed', zIndex: '100', top: '80px', margin: '10px', fontWeight: 'bolder'}}>
        <h1 style={{fontSize: '64px', color: '#FF5A64'}}>{points}</h1>
        <p style={{marginTop: '-10px', fontSize: '16px'}}>POINTS</p>
      </div>
      <APIProvider apiKey={'AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI'}>
        <div style={{height: '90vh'}}>
            <Map center={position} zoom={14} mapId={'f292b91ec3d6c7d6'}>
            {
              events && events.map((event: any, index: number) => {
                return (
                  <EventMarker key={index} lat={event.latitude} lng={event.longitude} title={event.locationName} description={event.description} />
                );
              })
            }
          </Map>
        </div>
      </APIProvider>
    </>
  );
}

export default Page;
