'use client';

import React, { useState } from 'react';

export default function UserPage() {
    // Dummy data import can be converted to dynamic import if necessary
    let data = require('../../data/dummy_data.json');

    // Hardcoded for now, will change
    const [name, setName] = useState('USERNAME');
    const [points, setPoints] = useState(30); 
    const [position, setPosition] = useState(56); 

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">

            {/* Profile picture does not currently have a way to upload the picture*/}
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            
            {/* username and points */}
            <h1 className="text-xl font-bold mt-4 text-black">{name}</h1>
            <p className="text-gray-600">{points} points</p>
            <p className="text-red-500 mt-2">---- #{position} on leaderboard ----</p>

            {/* Buttons do not currently do anything when pressed*/}
            {/*py makes the buttons more vertical, mt is for top margin*/}
            <button className="bg-green-500 text-white w-40 py-4 rounded-full mt-16">
                Account
            </button>
            <button className="bg-green-500 text-white w-40 py-4 rounded-full mt-2">
                Leaderboard
            </button>
            <button className="bg-green-500 text-white w-40 py-4 rounded-full mt-2 mb-8">
                Logout
            </button>

            {/* Arrows do not currently do anything, we need to modify*/}
            <div className="flex justify-between absolute bottom-4 left-0 right-0 px-4">
                <span className="text-gray-600">{"<"}</span>
                <span className="text-gray-600">{">"}</span>
            </div>
        </div>
    );
}

