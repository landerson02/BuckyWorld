"use client";
// API KEY: AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI
import React, { useEffect, useState } from 'react';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import EventMarker from './components/EventMarker';
import { getLocations, UserLocation, getUserLocation } from '@/lib/Service';
import { Location_type } from '@/lib/Types';
import Link from 'next/link';
import EventsList from './components/EventsList';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import SignInPage from './signin/page';


// Define the React component (following naming convention)
function Home() {
  // curr position
  const position = { lat: 43.0722, lng: -89.4008 };
  // locations
  const [locations, setLocations] = useState<Location_type[]>([]);
  // user location
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  // zoom
  const [defaultZoom, setDefaultZoom] = useState(14);
  // Dummy data
  let events = require('../data/dummy_data.json').Events;
  // user points
  const [points, setPoints] = useState(0);

  // Fetch locations data
  useEffect(() => {
    getLocations().then((data: Location_type[]) => {
      setLocations(data);
      console.log(data);
    });
  }, []);
  
  // Fetch user location data
  useEffect(() => {
    getUserLocation().then((value: UserLocation | null) => {
      setUserLocation(value);
      console.log(value);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  const { data: session } = useSession()

  return (
    <>
      {
        session ? (
            <div className='flex flex-col h-[100vh] relative'>
              {/* POINTS DIV */}
              <div style={{position: 'fixed', zIndex: '100', top: '80px', margin: '10px', fontWeight: 'bolder', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {/* <Link href={'./userpage'} ><FaUserCircle style={{ fontSize: '54px', color: '#66B566', background: 'white', borderRadius: '25px', textShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)'}} onClick={ () => {}}/></Link> */}
              <Link href={'./userpage'} >
                <Image 
                  src={session.user?.image!} 
                  alt="user" 
                  width={60} 
                  height={60} 
                  className='rounded-full cursor-pointer shadow-lg' 
                />
              </Link>
              <h1 className='text-6xl text-[#FF5A64] mt-3'>{points}</h1>
              <p className='text-lg'>POINTS</p>
              
            </div>
            {/* Wrap the Map component with APIProvider and provide the API key */}
              <APIProvider apiKey={"AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI"}>
                <div className='flex-grow'>
                    <Map 
                      defaultCenter={position} 
                      defaultZoom={defaultZoom} 
                      mapId={'f292b91ec3d6c7d6'}
                      zoomControl={false}
                      mapTypeControl={false}
                      streetViewControl={false}
                      fullscreenControl={false}
                      maxZoom={defaultZoom + 2}
                      minZoom={defaultZoom - 2} > {/* mapId is the style of the map created on googles platform*/}
                    {
                      locations && locations.map((location: any, index: number) => {
                        return (
                          <EventMarker key={index} lat={location.latitude} lng={location.longitude} title={location.locationName} description={location.description} />
                        );
                      })
                    }
                    {
                      userLocation && <EventMarker lat={userLocation?.lat} lng={userLocation?.long} title={'Event 1'} description={'Description 1'} />
                    }
                  </Map>
                </div>
              </APIProvider>
            <div className='bottom-0'>
              <EventsList />
            </div>
          </div>
        ) : (
          <SignInPage />
        )
      }
    </>
        
        // <SignInPage />
    
  );
}

export default Home;
