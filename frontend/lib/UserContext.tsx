'use client'
import React, { createContext, useContext, useState } from "react";
import {User_type} from "@/lib/Types";

type UserContextType = {
  user: User_type,
  setUser: (user: User_type) => void,
}

// Create the context for the user
export const UserContext = createContext<UserContextType>( {
    user: {} as User_type,
    setUser: () => {}
  }
);

// Create the provider for the user context
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({} as User_type);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}