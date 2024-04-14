'use client'
import React, { useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { login } from "@/lib/Service";
import { User_type } from "@/lib/Types";
import { UserContext } from "@/lib/UserContext";
import Image from "next/image";

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isBadCredentials, setIsBadCredentials] = useState(false);

  const { data: session } = useSession();

  // States for login errors
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorShowing, setIsErrorShowing] = useState(false);

  // Get the user context
  const { setUser } = useContext(UserContext);

  // Handles the sign in form submission
  const submitSignIn = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset error states
    setIsBadCredentials(false);
    setIsErrorShowing(false);

    if (!username || !password) { // Make sure both fields are non-empty
      setIsBadCredentials(true);
      return;
    }
    login(username, password).then((data: User_type | string) => {
      // Login either returns the user object or an error message
      if (typeof data === 'string') {
        // If the data is a string, it's an error message, so display it to users
        setErrorMessage(data);
        setIsErrorShowing(true);
        return;
      } else {
        // If the data is a user object, set the user context
        setUser(data);
        // TODO: Add redirect to the home page
      }
    });
  }


  return (
    <div className={'flex flex-col items-center overflow-y-hidden h-screen justify-center'}>
      <Image
        src={'/logo.png'}
        alt='logo'
        width={200}
        height={200}
        className="max-w-[300px] w-[300px] px-10"
      />
      <div className={'font-medium text-2xl'}>Welcome to</div>
      <div className={'font-bold text-4xl italic text-[#FF5A64] tracking-[7px]'}>BuckyWorld</div>

      <button
        onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/' })}
        className="bg-[#66B566] text-white rounded-2xl mt-10
              flex flex-col justify-center items-center p-2 text-lg font-semibold"
      >
        Sign in with Google
      </button>

      <form role="form" className={'flex flex-col pt-20 text-2xl font-light'} onSubmit={submitSignIn}>
        <label htmlFor="username" className={'text-xl'}>Username</label>
        <input
          id="username"
          className={'bg-[#7DB3E5] rounded-md border focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]'}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className={'pt-4 text-xl'}>Password</label>
        <input
          id="password"
          className={'bg-[#7DB3E5] rounded-md border focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]'}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
        />
        {/* if the username or password is blank, show an error message */}
        {isBadCredentials && <div className={'text-red-500 pt-4 font-light text-sm'}>Please enter a valid username and password</div>}
        {/* if the username or password is incorrect, show an error message */}
        {isErrorShowing && <div className={'text-red-500 pt-4 font-light text-sm'}>{errorMessage}</div>}
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
