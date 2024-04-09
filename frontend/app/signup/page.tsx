'use client'
import React, {useState} from "react";

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const submitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);
    console.log('submitted');
    // TODO: Add sign up functionality
  }

  return (
    <div className={'h-screen flex flex-col items-center'}>
      <div className={'text-2xl font-light pt-12'}>Create your account</div>

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
        {!passwordMatch && <div className={'text-red-500 pt-4'}>Passwords do not match</div>}
        <button
          className={'mt-12 rounded-2xl bg-[#66B566] text-xl text-white w-24 h-10 self-center'}
          type="submit"
        >
          Register
        </button>
      </form>

      <div className={'pt-12 text-[#FF5A64] font-light'}>Already a user?</div>
      <a
        href={'/signin'}
        className={'border-2 border-[#FF5A64] rounded-2xl text-[#FF5A64] w-20 h-10 text-center flex flex-col justify-center'}
      >Log In</a>
    </div>
  )
}