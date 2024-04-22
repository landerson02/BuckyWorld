'use client'
import { NextPage } from 'next';
import React, { useState, useEffect, ChangeEvent, useContext, FormEvent } from 'react';
import { Landmark_type, Pin_type } from '@/lib/Types';
import { addLandmark } from '@/lib/Service';
import { useRouter } from 'next/navigation'
import { UserContext } from '@/lib/UserContext';
import SignInPage from '../signin/page';




/**
 * add landmark page
 * @returns page to add landmark info
 */
const Page: NextPage = () => {

  // Get the user context
  const { user, updateUser } = useContext(UserContext); 


  //const { pins, addPin } = ManagePins();
  const router = useRouter()

  /**
   * landmark type, we will change location to landmark
   */
  const [landmark, setLandmark] = useState<Landmark_type>({
    landmarkName: '',
    latitude: 0,
    longitude: 0,
    url: '',
    description: '',
    landmarkId: -1,
    points: 0
  });

  /**
   * 
   * updates landmark when input updates
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setLandmark({ ...landmark, [e.target.name]: val });
  };


  // only adds to db when landmark fields are all present
  useEffect(() => {
    const checkAndAddLandmark = async () => {
        const { landmarkName, latitude, longitude, url, points, description } = landmark;
        if (landmarkName && latitude && longitude && url && points && description) {
            // Perform API call when landmark is fully updated
            try {
                await addLandmark(landmark);
  
                // Navigate back to map page
                router.push('/');

            } catch (error) {
                console.error("Failed to add landmark:", error);
                alert("Something went wrong, pelase try again")
            }
        }
    };

    checkAndAddLandmark(); // Call the async function within useEffect
}, [landmark, router]); // Include all dependencies used inside useEffect


  /**
   * takes landmark info to db  and adds pin to map
   * @param e 
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Fetch coordinates from localStorage
    const coordinatesString = localStorage.getItem("coordinates") || "{}";
    const coordinates = JSON.parse(coordinatesString);
  
    // Set coordinates only if they exist and are valid
    if (coordinates.lat && coordinates.lng) {

      // set coordinates of landmark
      setLandmark(prevState => ({
        ...prevState,
        latitude: coordinates.lat,
        longitude: coordinates.lng
      }));

      

    } else {
      alert("Invalid or missing coordinates.");
    }
  };
  

  return (
    user ? (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        {/* Form container */}
        <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
          {/* Form title */}
          <h1 className="text-xl font-bold mb-6">Add a Landmark</h1>
  
          {/* Grid layout for form fields */}
          <div className='grid grid-cols-1 gap-y-6'>
            {/* Landmark Name input */}
            <div>
              <label htmlFor="landmarkName" className="block text-xl mb-1">Landmark Name</label>
              <input
                id="landmarkName"
                className="bg-[#7DB3E5] w-full rounded-md border p-2 
                focus:outline-none focus:ring-1 
                focus:ring-[#FF5A64] focus:border-[#FF5A64]"
                name="landmarkName"
                type="text"
                value={landmark.landmarkName}
                onChange={handleChange}
              />
            </div>
  
            {/* Points input */}
            <div>
              <label htmlFor="points" className="block text-xl mb-1">Points</label>
              <input
                id="points"
                className="bg-[#7DB3E5] w-full rounded-md border 
                p-2 focus:outline-none focus:ring-1 
                focus:ring-[#FF5A64] focus:border-[#FF5A64]"
                name="points"
                type="number"
                value={landmark.points}
                onChange={handleChange}
              />
            </div>
  
            {/* Picture URL input */}
            <div>
              <label htmlFor="url" className="block text-xl mb-1">Picture URL</label>
              <input
                id="url"
                className="bg-[#7DB3E5] w-full rounded-md border p-2 
                focus:outline-none focus:ring-1 focus:ring-[#FF5A64] 
                focus:border-[#FF5A64]"
                name="url"
                type="text"
                value={landmark.url}
                onChange={handleChange}
              />
            </div>
  
            {/* Description input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="block text-xl mb-1">Description</label>
              <textarea
                id="description"
                className="bg-[#7DB3E5] w-full rounded-md border p-2 
                focus:outline-none focus:ring-1 
                focus:ring-[#FF5A64] focus:border-[#FF5A64]"
                rows={3}
                name="description"
                value={landmark.description}
                onChange={handleChange}
              />
            </div>
  
            {/* Buttons layout */}
            <div className="flex space-x-4 w-full">
              {/* Cancel button */}
              <button
                type="button"
                onClick={() => router.push('/')}
                className="secondary-button bg-gray-500 hover:bg-gray-700 
                text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline flex-1"
              >
                Cancel
              </button>
  
              {/* Submit button */}
              <button
                type="submit"
                className="primary-button bg-green-500 hover:bg-green-700 
                text-white font-bold py-2 px-4 rounded focus:outline-none 
                focus:shadow-outline flex-1"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    ) : (
      /* If the user context is null, then render the sign in page */
      <SignInPage />
    )
  );
        

}

export default Page;
