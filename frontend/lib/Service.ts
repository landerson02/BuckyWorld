
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
    if(!res.ok) { // if the response is not ok, throw an error
      throw new Error("Failed to get locations");
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
  const url = `${BASE_URL}/location?id=${id}`;
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