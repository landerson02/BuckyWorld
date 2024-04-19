'use client';
import Image from 'next/image';
import { useState, useEffect, useContext } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { UserContext } from '@/lib/UserContext';
import { getLeaderboardRanking } from '@/lib/Service';


/**
 * Renders the UserPage component.
 *
 * @returns The UserPage component.
 */
export default function UserPage() {

    const [position, setPosition] = useState(); // leaderboard position

    const { data: session } = useSession();

    // Load in user context
    const { user } = useContext(UserContext);

    // Load in the users position on the leaderboard
    useEffect(() => {
        async function fetchUserPosition() {
            if (!user) {
                setPosition(undefined);
                return;
            }
            const newPosition = await getLeaderboardRanking(user.username);
            setPosition(newPosition);
        }
        fetchUserPosition();
    }, [user]);

    /**
     * Handles the sign out action.
     */
    const handlesignOut = async () => {
        await signOut();
        window.location.href = '/';
    };

    return (
        user ? (
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
                <h1 data-testid="username" className="text-xl font-bold mt-4 text-black">{user.username}</h1>
                <p data-testid="points" className="text-gray-600">{user.points} points</p>
                {position && <p className="text-red-500 mt-2">---- #{position} on leaderboard ----</p>}

                {/* Buttons do not currently do anything when pressed */}
                {/* py makes the buttons more vertical, mt is for top margin */}
                { /*<button className="primary-button">*/}
                { /*Account*/}
                { /*</button>*/}
                <Link href="/leaderboard">
                    <button className="primary-button">
                        Leaderboard
                    </button>
                </Link>
                <button
                    onClick={() => {
                        handlesignOut();
                    }} className="primary-button">
                    Logout
                </button>
            </div>
        ) : (
            <div>
                <h1> Loading... </h1>
            </div>
        )
    );
}

