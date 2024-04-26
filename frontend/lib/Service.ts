import { ok } from "assert";
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
    if (!res.ok) {
      // if the response is not ok, throw an error
      console.error("Failed to get landmarks");
    }
    // return the json response
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches a landmark by its id
 * @param id the id of the landmark to fetch
 * returns a promise that resolves to a landmark
 */
export async function getLandmarkById(id: number) {
  const url = `${BASE_URL}/landmark?id=${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      // if the response is not ok, throw an error
      console.error("Failed to get landmark");
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
          resolve({ lat: latitude, long: longitude });
        },
        (error) => {
          console.error("Error getting user location: ", error.message);
          reject(null);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject(null);
    }
  });
}

/**
 * calls api to put landmark in the db
 * @param landmark
 */
export async function addLandmark(landmark: Landmark_type) {
  const url = `${BASE_URL}/addlandmark`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: landmark.landmarkName,
        latitude: landmark.latitude,
        longitude: landmark.longitude,
        url: landmark.url,
        points: landmark.points,
        description: landmark.description,
      }),
    });
    if (!res.ok) {
      // if the response is not ok, throw an error
      throw new Error("Failed to add landmark");
    } else {
      alert("Thanks for adding a Landmark!");
    }
    // return the json response
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches the user account by username and password
 * Returns either the user account in a promise, or an error message
 * @param username username of the account
 * @param password password of the account
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
      body: JSON.stringify({ username, password }), // Send the username and password in the body
    });
    // If the response is not okay, return the error message
    if (res.status === 404) return "Username not found";
    if (res.status === 401) return "Incorrect password";
    // Otherwise return the user account
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Saves the user account in the database
 * @returns the status of the response
 * @param username username of the account
 * @param password password of the account
 */
export async function createUserAccount(username: string, password: string) {
  // url defined in UserController.java for creating a new user
  const url = `${BASE_URL}/save-user`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    // Return the status of the response
    return res.status;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches the top 10 users by points
 * @returns a promise that resolves to an array of users
 */
export async function getTop10Users() {
  // url in UserController.java to get the top 10 users
  const url = `${BASE_URL}/top-10-users`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches the users points
 * @param username username of the account
 * @returns a promise that resolves to the points of the user
 */
export async function getLeaderboardRanking(username: string) {
  // url in UserControllet.java to get the ranking of the user
  const url = `${BASE_URL}/get-user-ranking?username=${username}`;
  try {
    const res = await fetch(url, {
      method: "GET",
    });

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}


export async function addToAttended(username: string, landmarkId: number) {
  // url in UserController.java to add a landmark to the users attended list
  // const url = `${BASE_URL}/attend`;
  // try {
  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username, landmarkId }),
  //   });
    
  //   if (!res.ok) {
  //     console.log("res NOT ok")
  //     throw new Error(`Failed to add landmark to attended list.`);
  //   }

  //   console.log("res ok")
  //   return await res.json();

  // } catch (error) {
  //   console.log("throwing error")
  //   throw error;
  // }
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/attend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, landmarkId }),
    })
    .then((res) => {
      console.log("---------RES STATUS: ", res.status);
      if (res.status === 400) {
        console.log("wtf is going on")
        return reject();
      } else {
        console.log("lol you failed")
        // return res.json();
        return resolve("Success");
      }
    })
  });
}

/**
 * Checks if two coordinates are within a certain distance from each other.
 * @param lat1 - The latitude of the first coordinate.
 * @param lon1 - The longitude of the first coordinate.
 * @param lat2 - The latitude of the second coordinate.
 * @param lon2 - The longitude of the second coordinate.
 * @returns A boolean indicating whether the two coordinates are within the specified distance.
 */
export function isAtLandmark(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles
  return distance < 0.1;
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
