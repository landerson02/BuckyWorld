'use client';
import { User_type } from "@/lib/Types";
import { useState, useEffect } from "react";
import { getTop10Users } from "@/lib/Service";
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import Link from "next/link";


export default function Page() {

  // Top 10 users state
  const [topUsers, setTopUsers] = useState<User_type[]>();

  // Position on leaderboard
  const [place, setPlace] = useState<number>();

  // Load in leaderboard data on page load
  useEffect(() => {
    // Load top 10 users by points
    async function fetchTopUsers() {
      const users = await getTop10Users();
      console.log(users);
      setTopUsers(users);
    }

    // Load user's position on leaderboard
    async function fetchUserPlace() {
      // TODO: Fetch the user's place on the leaderboard
      const userPlace = -1;
      setPlace(userPlace);
    }

    fetchTopUsers();
    fetchUserPlace();
  }, []);

  return (
    <div className={'w-full h-screen flex flex-col items-center justify-center'}>
      {/* Back to home page button */}
      <Link
        href="/"
        className='absolute top-4 left-4 bg-green-500 h-10 w-10 rounded-full flex items-center justify-center'
      >
        <ChevronLeftIcon className='text-white rounded-full text-5xl pr-1' />
      </Link>

      <h1 className={'font-bold text-4xl italic text-[#FF5A64] tracking-[7px] w-full pb-8 text-center'}>Leaderboard</h1>

      {/* Leaderboard table */}
      <ul className={'w-full flex flex-col gap-2'}>
        <div className={'w-full px-2 flex justify-between pb-6'}>
          <div className={'text-xl text-center w-1/3'}>Place</div>
          <div className={'text-xl text-center w-1/3'}>Username</div>
          <div className={'text-xl text-center w-1/3'}>Points</div>
        </div>
        {/* List the users */}
        {topUsers ? (topUsers.map((user: User_type, index: number) => (
          <li key={index} className={'w-full px-2 flex justify-between items-center h-12 ' + (index % 2 === 1 && 'bg-gray-50')}>
            {/* first - third place emojis */}
            {index === 0 && <div className={'font-bold text-3xl w-1/3 text-center'}>🥇</div>}
            {index === 1 && <div className={'font-bold text-3xl w-1/3 text-center'}>🥈</div>}
            {index === 2 && <div className={'font-bold text-3xl w-1/3 text-center'}>🥉</div>}
            {index > 2 && <div className={'font-bold text-xl w-1/3 text-center'}>{index + 1}</div>}
            <div className={'font-light text-md w-1/3 text-center'}>{user.username}</div>
            <div className={'font-semibold text-2xl w-1/3 text-center'}>{user.points}</div>
          </li>
        ))) : (
          <div className={'font-light text-lg text-center w-full'}>Loading...</div>
        )}

        {/* Your place on the leaderboard */}
        {place && <div className={'font-light text-lg text-center flex justify-center items-center gap-3'}>
          Your position is:
          <span className={'font-bold text-4xl text-[#FF5A64]'}>
            {place}
          </span>
        </div>}

      </ul>
    </div>
  )
}
