"use client";
import usersHttpClient from "@/http-clients/users.http-client";
import { User } from "@/interfaces/user";
import { getIdFromToken } from "@/utils/get-id-from-token";
import { isClient } from "@/utils/is-client";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextState {
  user: User | null;
  onUserLoggedIn: (user: User) => void;
  onUserSignOut: () => void;
}

interface UsersProviderProps {
  children: any;
}

const userContextStateDefaultValue: UserContextState = {
  user: null,
  onUserLoggedIn: (user: User) => {},
  onUserSignOut: () => {},
};

const UsersContext = createContext<UserContextState>(
  userContextStateDefaultValue
);

export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const getUserById = useCallback(async (id: number) => {
    const user = await usersHttpClient.getUserById(id);
    setUser(user);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (!token) return;
    const id = getIdFromToken(token);
    getUserById(id);
  }, []);

  const onUserLoggedIn = (user: User) => {
    localStorage.setItem("jwt-token", `some-dummy-value-${user.id}`);
    setUser(user);
    router.push("/products");
  };

  const onUserSignOut = () => {
    setUser(null);
    localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <UsersContext.Provider value={{ user, onUserLoggedIn, onUserSignOut }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
