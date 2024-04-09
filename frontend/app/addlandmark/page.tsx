'use client'
import { NextPage } from 'next';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Landmark_type } from '@/lib/Types';
import { addLandmark } from '@/lib/Service';



const Page: NextPage = () => {
  /**
   * landmark type, we will change location to landmark
   */
  const [landmark, setLandmark] = useState<Landmark_type>({
    name: '',
    latitude: 0,
    longitude: 0,
    url: '',
    description: '',
  });

  /**
   * 
   * updates landmark when input updates
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLandmark({ ...landmark, [e.target.name]: e.target.value });
  };

  /**
   * 
   * checks if all fields are filled
   * calls api to add landmark
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, latitude, longitude, url, description } = landmark;
    if (!name || !latitude || !longitude || !url || !description) {
      alert('Please fill out all the fields.');
      return;
    }

    // calls the api to add the landmark to the db
    addLandmark(landmark);

    
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Form container */}
      <form className="w-full max-w-lg space-y-6" onSubmit={handleSubmit}>
        {/* Form title */}
        <h1 className="text-xl font-bold mb-6">Add a Landmark</h1>

        {/* Grid layout for form fields */}
        <div className='grid grid-cols-1 gap-y-6'>

          {/* Landmark Name input */}
          <div>
            <label htmlFor="name" className="block text-xl mb-1">Landmark Name</label>
            <input
              id="name"
              className="bg-[#7DB3E5] w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]"
              name="name"
              type="text"
              value={landmark.name}
              onChange={handleChange}
            />
          </div>

          {/* Latitude input */}
          <div>
            <label htmlFor="latitude" className="block text-xl mb-1">Latitude</label>
            <input
              id="latitude"
              className="bg-[#7DB3E5] w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]"
              name="latitude"
              type="text"
              value={landmark.latitude}
              onChange={handleChange}
            />
          </div>

          {/* Longitude input */}
          <div>
            <label htmlFor="longitude" className="block text-xl mb-1">Longitude</label>
            <input
              id="longitude"
              className="bg-[#7DB3E5] w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]"
              name="longitude"
              type="text"
              value={landmark.longitude}
              onChange={handleChange}
            />
          </div>

          {/* Picture URL input */}
          <div>
            <label htmlFor="url" className="block text-xl mb-1">Picture URL</label>
            <input
              id="url"
              className="bg-[#7DB3E5] w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]"
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
              className="bg-[#7DB3E5] w-full rounded-md border p-2 focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]"
              rows={3}
              name="description"
              value={landmark.description}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="primary-button w-full mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>

  );
};

export default Page;
