'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'


/**
 * Renders the UserPage component.
 *
 * @returns The UserPage component.
 */
export default function UserPage() {
    // Dummy data 
    let dummyData = require('../../data/dummy_data.json');

    // Hardcoded name points position for now, will change
    const [name, setName] = useState(dummyData.Users[0].Username);
    const [points, setPoints] = useState(dummyData.Users[0].TotalPoints);
    const [position, setPosition] = useState(56); // Dummy leaderboard position
    const { data: session } = useSession();

    /**
     * Handles the sign out action.
     */
    const handlesignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
            <Link href="/"
                className='absolute top-4 left-4 bg-green-500 h-10 w-10 rounded-full flex items-center justify-center'
            >
                <ChevronLeftIcon className='text-white rounded-full text-5xl pr-1' />
            </Link>
            {/* Profile picture does not currently have a way to upload the picture*/}

            {/* <div data-testid="profile-picture" className="w-24 h-24 bg-gray-300 rounded-full"></div> */}

            {/* <div className="w-24 h-24 bg-gray-300 rounded-full"></div> */}
            <Image
                src={session ? session.user?.image! : '/logo.png'}
                priority
                alt="user"
                width={100}
                height={100}
                className='rounded-full'
            />


            {/* username and points */}
            {/* <h1 className="text-xl font-bold mt-4 text-black">{name}</h1> */}
            <h1 data-testid="username" className="text-xl font-bold mt-4 text-black">{session?.user?.name}</h1>
            <h3 data-testid="email" className="text-lg text-black">{session?.user?.email?.split("@")[0]}</h3>
            <p data-testid="points" className="text-gray-600">{points} points</p>
            <p className="text-red-500 mt-2">---- #{position} on leaderboard ----</p>

            {/* Buttons do not currently do anything when pressed */}
            {/* py makes the buttons more vertical, mt is for top margin */}
            <button className="primary-button">
                Account
            </button>
            <button className="primary-button">
                Leaderboard
            </button>
            <button
                onClick={() => {
                    handlesignOut();
                }} className="primary-button">
                Logout
            </button>
        </div>
    );
}

