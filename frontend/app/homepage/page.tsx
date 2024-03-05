"use client";
// AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI
// Import necessary libraries and modules
import React, { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import  EventMarker from './EventMarker';
import { getLocations } from '@/lib/Service';
import { Location_type } from '@/lib/Types';


// Define the React component (following naming convention)
function Page() {
  // curr position
  const position = { lat: 43.0722, lng: -89.4008 };

  const [locations, setLocations] = useState<Location_type[]>([]);
  
  // Dummy data
  let events = require('../../data/dummy_data.json').Events;

  // Fetch locations data
  useEffect(() => {
    getLocations().then((data:Location_type[]) => {
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
              locations && locations.map((location: any, index: number) => {
                return (
                  <EventMarker key={index} lat={location.latitude} lng={location.longitude} title={location.locationName} description={location.description} />
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
