'use client'
import React, {useState} from "react";
import { signIn, useSession } from "next-auth/react";

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
      <div className={'font-medium text-2xl pt-12'}>Welcome to</div>
      <div className={'font-bold text-4xl italic text-[#FF5A64]'}>BuckyWorld</div>

      <button 
        onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })} 
        className="bg-[#FF5A64] text-white rounded-2xl w-40 h-10 mt-12 flex flex-col justify-center items-center"
      >
        Sign in with Google
      </button>

      <form role="form" className={'flex flex-col pt-20 text-2xl font-light'} onSubmit={submitSignIn}>
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
      >Register</a>
    </div>
  )
}