'use client'

import React, { useState, useEffect, useContext } from "react";
import { getLandmarkById } from "@/lib/Service";
import { Landmark_type } from "@/lib/Types";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { addToAttended } from "@/lib/Service";
import { UserContext } from "@/lib/UserContext";


// search params accesses the query parameters in the URL
// example url: /location?id=15
export default function Page({ searchParams }: { searchParams: { id: number } }) {
  // location state
  const [landmark, setLandmark] = useState<Landmark_type>();

  const { user } = useContext(UserContext);

  // On render load in the location object by its id
  useEffect(() => {
    getLandmarkById(searchParams.id).then((landmark) => {
      setLandmark(landmark);
      console.log(landmark);
    });

  }, [searchParams.id]);

  // On button click, check if the user is at the location and give points to the user
  const submitImHere = () => {
    // TODO: Implement adding points
    // addToAttended(user!.username, searchParams.id).then(() => {
    //   console.log('Added to attended');
    // });
  }

  return (
    landmark && <div className={'h-screen w-full flex flex-col justify-center items-center gap-8'}>
      {/* back button in top left */}
      <Link
        href={'/'}
        className='absolute top-4 left-4 bg-green-500 h-10 w-10 rounded-full flex items-center justify-center'
      >
        <ChevronLeftIcon className='text-white rounded-full text-5xl pr-1' />
      </Link>
      {/*TODO: Add actual image url*/}
      <Image
        src={'/dummy_image.png'}
        priority={true}
        alt={landmark.landmarkName}
        className={'h-auto w-[90%] border border-black'}
        width={400}
        height={400}
      />

      <div className={'font-medium text-3xl border-b-2 border-b-[#FF5A64] max-w-[90%] text-center'}>{landmark.landmarkName}</div>
      <div className={'font-light text-sm h-16 w-[90%] text-center'}>{landmark.description}</div>

      <div className={'flex justify-between w-56 items-center gap-12'}>
        <button
          className={'rounded-3xl bg-[#66B566] text-2xl text-white w-36 h-14 self-center'}
          onClick={submitImHere}
        >Im Here </button>

        <div className={'flex flex-col justify-center items-center'}>
          <div className={'font-bold text-5xl text-[#FF5A64]'}>+{landmark.points}</div>
          <div className={'font-light text-lg'}>Points</div>
        </div>
      </div >

    </div >
  );
}
