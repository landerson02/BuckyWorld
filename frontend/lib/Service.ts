import { Landmark_type } from "./Types";


// get the BACKEND_URL from the .env file
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

/**
 * Fetches all the locations from the backend
 * returns a promise that resolves to an array of locations
 */
export async function getLandmarks() {
  // the url to fetch the locations from
  // depends on whether its running locally or on the vm
  const url = `${BASE_URL}/landmarks`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) { // if the response is not ok, throw an error
      throw new Error("Failed to get landmarks");
    }
    // return the json response
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches a location by its id
 * returns a promise that resolves to a location
 */
export async function getLocationById(id: number) {
  const url = `${BASE_URL}/landmark?id=${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) { // if the response is not ok, throw an error
      throw new Error("Failed to get location");
    }
    // return the json response
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}



export interface UserLocation {
  lat: number; // latitude
  long: number; // longitude
}

/**
 * Fetches the users location
 * returns a promise that resolves to the users location
 */
export async function getUserLocation(): Promise<UserLocation | null> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({lat: latitude, long: longitude});
        },
        (error) => {
          console.error('Error getting user location: ', error.message);
          reject(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      reject(null);
    }
  });

}

/**
 * calls api to put landmark in the db
 * @param landmark
 */
export async function addLandmark(landmark: Landmark_type){
  const url = `${BASE_URL}/addlandmark`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          name: landmark.name,
          latitude: landmark.latitude,
          longitude: landmark.longitude,
          url: landmark.url,
          description:landmark.description

        })
    });
    if(!res.ok) { // if the response is not ok, throw an error
      throw new Error("Failed to add landmark");
    }else{
      alert("Thanks for adding a Landmark!")
    }
    // return the json response
  } catch (error) {
    console.log(error);
  }

}

/**
 * Fetches the user account by username and password
 * Returns a promise that resolves to the user account if it exists, otherwise null
 * @param username
 * @param password
 */
export async function login(username: string, password: string) {
  // url in UserController.java for login
  const url = `${BASE_URL}/login`;
  try {
    const res = await fetch(url, {
      method: "POST", // POST request to create a new user
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}), // Send the username and password in the body
    });
    if(!res.ok) { // if the response is not ok, throw an error
      console.error("Failed to login");
    }
    // return the json response
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Creates a new user account and stores it in the db
 * Returns a promise that resolves to either 0, 1, or 2
 * 0: user account created successfully
 * 1: username is invalid
 * 2: username already exists
 * @param uID
 * @param username
 * @param password
 */
export async function createUserAccount(uID: number, username: string, password: string) {
  // url defined in UserController.java for creating a new user
  const url = `${BASE_URL}/save-user?uID=${uID}&username=${username}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) { // if the response is not ok, throw an error
      console.error("Failed to create user");
    }
    // return the json response
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}