// get the BACKEND_URL from the .env file
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

/**
 * Fetches all the locations from the backend
 * returns a promise that resolves to an array of locations
 */
export async function getLocations() {
  // the url to fetch the locations from
  // depends on whether its running locally or on the vm
  const url = `${BASE_URL}/locations`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      // if the response is not ok, throw an error
      console.error("Failed to get locations");
    }
    // return the json response
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches a location by its id
 * @param id the id of the location to fetch
 * returns the location if it exists
 */
export async function getLocationById(id: number) {
  const url = `${BASE_URL}/location?id=${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      // if the response is not ok, throw an error
      console.error("Failed to get location");
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
    // If the repsponse is not okay, return the error message
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
