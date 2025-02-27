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
  // state for if user is adding landmark
  const [addingLandmark, setAddingLandmark] = useState(false);


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
    async function checkUser() {
      // If session != null, then the user is logged in with google
      // then, try login to check if the user exists in the db
      if (session && session.user && session.user.email) {
        const data = await login(session.user.email, "");
        if (typeof data === 'string') { // login failed, user account does not exist
          // Create a new account with email as username, empty password
          if (session && session.user && session.user.email) {
            const status = await createUserAccount(session.user.email, "");
            if (status !== 200) { // make sure the account was created
              console.error("Failed to create user account");
              return;
            }
            // Then login to new account
            const data = await login(session.user.email, "");
            updateUser(data); // update the user context
          }
        } else { // User account exists
          updateUser(data);
        }
      }
    }

    checkUser(); // Call the function to login
  }, [session]);

  return (
    <>
      {
        // If the user context is not null, then render the map
        user ? (
          <div className='flex flex-col h-[100vh] relative'>
            {/* POINTS DIV */}
            <div className={'absolute z-10 top-10 m-2 font-bold flex flex-col items-center'}>

              <Link href={'userpage'}>
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
            <div className='absolute flex w-full justify-center items-center top-3 z-20 opacty-100'>
              <p className='text-2xl text-red-500 font-bold outline-2 outline-black'>
                {
                  addingLandmark ? 'Click on the map to add a landmark' : ''
                }
              </p>
            </div>
            {/* Wrap the Map component with APIProvider and provide the API key */}
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
              <div className={`flex-grow ${addingLandmark ? 'opacity-60' : 'opacity-100'}`}>
                <Map
                  defaultCenter={position}
                  defaultZoom={defaultZoom}
                  mapId={'f292b91ec3d6c7d6'}
                  onClick={
                    addingLandmark ? handleMapClick : undefined
                  }
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
            <div className='absolute z-10 bottom-10 flex w-full justify-center items-center'>
              <button
                className={`px-5 py-3 text-white text-center font-semibold rounded-lg text-xl
                            ${addingLandmark ? 'bg-red-500' : 'bg-green-500'}`
                }
                onClick={() => setAddingLandmark(!addingLandmark)}
              >
                {
                  addingLandmark ? 'Cancel' : 'Add Landmark'
                }
              </button>
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
