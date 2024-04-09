'use client'
import React, {useState} from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isBadCredentials, setIsBadCredentials] = useState(false);

  const { data: session } = useSession();

  const submitSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    if(!username || !password) {
      setIsBadCredentials(true);
      return;
    }
    setIsBadCredentials(false);
    console.log('submitted');
    // TODO: Add sign in functionality
  }


  return (
    <div className={'h-screen flex flex-col items-center'}>
      <Image 
        src={'/logo.png'}
        alt='logo' 
        width={200} 
        height={200}  
        className="w-full px-10 mt-[115px]" 
      />
      <div className={'font-medium text-2xl'}>Welcome to</div>
      <div className={'font-bold text-4xl italic text-[#FF5A64] tracking-[7px]'}>BuckyWorld</div>

      <button 
        onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })} 
        className="bg-green-500 text-white rounded-2xl mt-20 
              flex flex-col justify-center items-center p-4 text-xl font-semibold"
      >
        Sign in with Google
      </button>

      {/* <form role="form" className={'flex flex-col pt-20 text-2xl font-light'} onSubmit={submitSignIn}>
        <label className={'text-xl'}>Username</label>
        <input
          className={'bg-[#7DB3E5] rounded-md border focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]'}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className={'pt-4 text-xl'}>Password</label>
        <input
          className={'bg-[#7DB3E5] rounded-md border focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]'}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
        />
        {isBadCredentials && <div className={'text-red-500 pt-4 font-light text-sm'}>Please enter a valid username and password</div>}
        <button
          className={'mt-12 rounded-2xl bg-[#66B566] text-xl text-white w-20 h-10 self-center'}
          type="submit"
        >Log In</button>
      </form>

      <div className={'pt-12 text-[#FF5A64] font-light'}>New Here?</div>
      <a
        href={'/signup'}
        className={'border-2 border-[#FF5A64] rounded-2xl text-[#FF5A64] w-20 h-10 text-center flex flex-col justify-center'}
      >Register</a> */}
    </div>
  )
}