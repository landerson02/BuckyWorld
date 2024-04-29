'use client';
import Image from 'next/image';
import { useState, useEffect, FormEvent, useContext, useRef} from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { UserContext } from '@/lib/UserContext';
import { changeUsername, getLeaderboardRanking } from '@/lib/Service';


/**
 * Renders the UserPage component.
 *
 * @returns The UserPage component.
 */
export default function UserPage() {

    const [position, setPosition] = useState(); // leaderboard position

    const { data: session } = useSession();

    // Load in user context
    const { user, updateUser } = useContext(UserContext);

    // type new username when true
    const [ usernameBox, setUsernameBox ] = useState(false);

    // error message
    const [errorMessage, setErrorMessage] = useState("");

    // uncontrolled change username
    const usernameInputRef = useRef<HTMLInputElement>(null);

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

    /**
     * updates db with new username if allowed
     * @param e 
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        // changed username
        const newUsername = usernameInputRef.current?.value;

        if (newUsername && user){

            const res = await changeUsername(user.username, newUsername);
            if (res !== 200) {
                // error with changing
                setErrorMessage("Cannot change username to this");
            } else {
                
                // update context
                updateUser({ ...user, username: newUsername });

                setErrorMessage(""); // reset error message
                setUsernameBox(false); // Close the input box on success
                usernameInputRef.current.value = ""; // Clear input field
            }

        }


    }

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
                <span>
                    <button
                        onClick={() => {
                            setUsernameBox(true)
                        }} className="primary-button">
                        Change Username
                    </button>
                </span>
                <span>
                    {/** open input box to change username */}
                    {usernameBox && user.password && (
                            <form onSubmit={handleSubmit}>
                                {/* type new username here*/}
                                <input
                                    ref={usernameInputRef}
                                    id="usernameInput"
                                    className="bg-[#7DB3E5] w-full rounded-md 
                                    border p-2 focus:outline-none focus:ring-1 
                                    focus:ring-[#FF5A64] focus:border-[#FF5A64]"
                                    name="usernameInput"
                                    type="text"
                                />
                                <div className="flex justify-center mt-2">
                                    {/** submit the change*/}
                                    <button
                                        type="submit"
                                        className="bg-white text-[#ff5a64] border-[#ff5a64] border p-2
                                        py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Change
                                    </button>
                                </div>
                                {/** display error if something goes wrong */}
                                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            </form>
                    )}
                </span>
                    
                <button
                    onClick={handlesignOut} className="primary-button">
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

