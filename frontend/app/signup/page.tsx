'use client'
import React, { useContext, useState } from "react";
import { login, createUserAccount } from "@/lib/Service";
import { User_type } from "@/lib/Types";
import { UserContext } from "@/lib/UserContext";

export default function Page() {
  // States for the current form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // boolean for if the passwords match
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isBadCredentials, setIsBadCredentials] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);

  // Load in user context
  const { user, setUser } = useContext(UserContext);

  // Function to submit the sign-up form
  async function submitSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) { // Make sure both fields are non-empty
      setIsBadCredentials(true);
      return;
    }
    if (password !== confirmPassword) { // Make sure passwords match
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    setIsBadCredentials(false);
    setSignUpFailed(false);

    // Create the user account in the db, then log in
    const res = await createUserAccount(username, password) as number;
    if (res !== 200) {
      setSignUpFailed(true);
      return;
    }
    await login(username, password).then((data: User_type) => {
      setUser(data); // Set the user context
    });
    // TODO: Add redirect to the home page
  }

  return (
    <div className={'h-screen flex flex-col items-center'}>
      <div className={'text-2xl font-light pt-12'}>Create your account</div>

      {/*Form with username, password, and confirm password inputs*/}
      <form className={'flex flex-col pt-12 text-2xl font-light'} onSubmit={submitSignUp}>
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
        />
        <label htmlFor="confirmPassword" className={'pt-4 text-xl'}>Confirm Password</label>
        <input
          id="confirmPassword"
          className={'bg-[#7DB3E5] rounded-md border focus:outline-none focus:ring-1 focus:ring-[#FF5A64] focus:border-[#FF5A64]'}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/*If passwords don't match after submitting, this will show*/}
        {!passwordsMatch && <div className={'text-red-500 pt-4 font-light text-sm'}>Passwords do not match</div>}
        {/*If the username or password is invalid, this will show*/}
        {isBadCredentials && <div className={'text-red-500 pt-4 font-light text-sm'}>Please enter a valid username and password</div>}
        {/*If the sign-up failed, this will show*/}
        {signUpFailed && <div className={'text-red-500 pt-4 font-light text-sm'}>Username is either invalid or taken</div>}

        <button
          className={'mt-12 rounded-2xl bg-[#66B566] text-xl text-white w-24 h-10 self-center'}
          type="submit"
        >
          Register
        </button>
      </form>
      <button onClick={() => { console.log(user) }}>print user</button>

      {/*Link to the login page if the user already has an account*/}
      <div className={'pt-12 text-[#FF5A64] font-light'}>Already a user?</div>
      <a
        href={'/signin'}
        className={'border-2 border-[#FF5A64] rounded-2xl text-[#FF5A64] w-20 h-10 text-center flex flex-col justify-center'}
      >Log In</a>
    </div>
  )
}
