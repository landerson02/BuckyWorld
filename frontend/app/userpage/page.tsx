'use client';

import React, { useState } from 'react';

export default function UserPage() {
    // Dummy data 
    let data = require('../../data/dummy_data.json');

    

    // Hardcoded name points position for now, will change
    const [name, setName] = useState(data.Users[0].Username);
    const [points, setPoints] = useState(data.Users[0].TotalPoints); 
    const [position, setPosition] = useState(56); // Dummy leaderboard position

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">

            {/* Profile picture does not currently have a way to upload the picture*/}
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            
            {/* username and points */}
            <h1 className="text-xl font-bold mt-4 text-black">{name}</h1>
            <p className="text-gray-600">{points} points</p>
            <p className="text-red-500 mt-2">---- #{position} on leaderboard ----</p>

            {/* Buttons do not currently do anything when pressed */}
            {/* py makes the buttons more vertical, mt is for top margin */}
            <button className="primary-button">
                Account
            </button>
            <button className="primary-button">
                Leaderboard
            </button>
            <button className="primary-button">
                Logout
            </button>

        </div>
    );
}

