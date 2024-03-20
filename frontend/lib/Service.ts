
// get the BACKEND_URL from the .env file
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export async function getLocations() {
  const url = `${BASE_URL}/locations`;
  console.log('locations path: ', url);
  try {
    console.log('fetching locations');
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) {
      throw new Error("Failed to get locations");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getLocationById(id: number) {
  const url = `${BASE_URL}/location?id=${id}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.ok) {
      throw new Error("Failed to get location");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export interface UserLocation {
  lat: number;
  long: number;
}

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