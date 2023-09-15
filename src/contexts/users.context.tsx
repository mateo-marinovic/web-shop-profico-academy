"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextState {
  id: number;
}

interface UsersProviderProps {
  children: any;
}

const userContextStateDefaultValue: UserContextState = {
  id: 0,
};

const UsersContext = createContext<UserContextState>(
  userContextStateDefaultValue
);

export function UsersProvider({ children }: UsersProviderProps) {
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const token = localStorage?.getItem("jwt-token");

    const tokenParts = token?.split("-");
    const id = tokenParts ? parseInt(tokenParts[tokenParts.length - 1]) : 0;
    setId(id);
  }, []);

  return (
    <UsersContext.Provider value={{ id }}>{children}</UsersContext.Provider>
  );
}

export const useUsersContext = () => useContext(UsersContext);
