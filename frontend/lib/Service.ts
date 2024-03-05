
export async function getLocations() {
  const url = 'http://localhost:8080/locations';
  try {
    console.log('fetching')
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
  const url = `http://localhost:8080/location?id=${id}`;
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
