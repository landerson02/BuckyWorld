'use client'
import React, { createContext, useState } from "react";
import { User_type } from "@/lib/Types";

type UserContextType = {
  user: User_type | null,
  updateUser: (user: User_type) => void,
}

// Create the context for the user
export const UserContext = createContext<UserContextType>({
  user: null,
  updateUser: (user: User_type) => { }
}
);

// Create the provider for the user context
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User_type | null>(null);

  // Function for updating the user context
  const updateUser = (newUser: User_type) => {
    setUser(newUser);
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}
