"use client";
// API KEY: AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI
import React, { useContext, useEffect, useState } from 'react';
import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';
import EventMarker from './components/EventMarker';
import { getLandmarks, UserLocation, getUserLocation, login, createUserAccount } from '@/lib/Service';
import { Landmark_type, User_type } from '@/lib/Types';
import Link from 'next/link';
import EventsList from './components/EventsList';
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import SignInPage from './signin/page';
import { UserContext } from '@/lib/UserContext';
import { useRouter } from 'next/navigation'



// Define the React component (following naming convention)
function Home() {
  // curr position
  const position = { lat: 43.0722, lng: -89.4008 };
  // locations
  const [landmarks, setLandmarks] = useState<Landmark_type[]>([]);
  // user location
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  // zoom
  const [defaultZoom, setDefaultZoom] = useState(14);
  // route to landmark page
  const router = useRouter();


  // Fetch locations data
  useEffect(() => {
    getLandmarks().then((data: Landmark_type[]) => {
      setLandmarks(data);
    });
  }, []);

  // Fetch user location data
  useEffect(() => {
    getUserLocation().then((value: UserLocation | null) => {
      setUserLocation(value);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  // add pins
  const handleMapClick = (event: any) => {

    const coordinates = event.detail.latLng;

    if (coordinates) {

      // save to local storage
      const coordinatesString = JSON.stringify(coordinates); 
      localStorage.setItem("coordinates", coordinatesString);

      // go att addlandmark for additional details
      router.push('/addlandmark')

      
    }
  };

  const { user, updateUser } = useContext(UserContext); // Get the user context
  const { data: session } = useSession(); // Get the session context

  // Check if the user is logged in with google
  useEffect(() => {
    // If session != null, then the user is logged in with google
    // then, try login to check if the user exists in the db
    if (session && session.user && session.user.email) {
      login(session.user.email, "").then((data: User_type | string) => {
        if (typeof data === 'string') { // User Account does not exist
          // Create a new account with email as username
          if (session && session.user && session.user.email) {
            createUserAccount(session.user.email, "").then((data) => {

              if (data === 200) { // make sure the account was created
                if (!session || !session.user || !session.user.email) return;
                // Then login to new account
                login(session.user.email, "").then((data: User_type) => {
                  updateUser(data);
                });
              }
            });
          }
        } else { // User account exists; update the user context
          updateUser(data);
        }
      });
    }
  }, [session]);

  return (
    <>
      {
        // If the user context is not null, then render the map
        user ? (
          <div className='flex flex-col h-[100vh] relative'>
            {/* POINTS DIV */}
            <div className={'absolute z-10 top-10 m-2 font-bold flex flex-col items-center'}>

              <Link href={'userpage'} >
                <Image
                  src={session ? session.user?.image! : '/logo.png'}
                  alt="user"
                  width={60}
                  height={60}
                  className='rounded-full cursor-pointer shadow-lg'
                />
              </Link>
              <h1 className='text-6xl text-[#FF5A64] mt-3'>{user.points}</h1>
              <p className='text-lg'>POINTS</p>

            </div>
            {/* Wrap the Map component with APIProvider and provide the API key */}
            <APIProvider apiKey={'AIzaSyASGvI0TbbNWsG_5c5Poh5i5Kv9vudGFXI'}>
              <div className='flex-grow'>
                <Map
                  defaultCenter={position}
                  defaultZoom={defaultZoom}
                  mapId={'f292b91ec3d6c7d6'}
                  onClick={handleMapClick}
                  zoomControl={false}
                  mapTypeControl={false}
                  streetViewControl={false}
                  fullscreenControl={false}
                  maxZoom={defaultZoom + 2}
                  minZoom={defaultZoom - 2} > {/* mapId is the style of the map created on googles platform*/}
                  {
                    landmarks && landmarks.map((landmark: any, index: number) => {
                      return (
                        <EventMarker key={index} landmark={landmark} />
                      );
                    })
                  }
                  {
                    userLocation && <EventMarker key={-1} landmark={{ landmarkId: -1, description: "Your location", latitude: userLocation.lat, longitude: userLocation.long } as Landmark_type} />
                  }

                </Map>
              </div>
            </APIProvider>
            <div className='bottom-0'>
              <EventsList />
            </div>
          </div>
        ) : (
          <>
            {/* If the user context is null, then render the sign in page */}
            <SignInPage />
          </>
        )
      }
    </>
  );
}

export default Home;
