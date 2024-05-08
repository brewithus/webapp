'use client';
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import firebase from 'firebase/compat/app';
import { createUser } from '@/hooks/firebase/user';
import { googleSignOut } from '@/config/firebase';
import { toast } from 'sonner';
import {
  type UserPreferences,
  getUserPreferences,
} from '@/hooks/firebase/user-biz-interact';

interface UserContextType {
  user: firebase.User | null;
  setUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
  userPreferences: UserPreferences | null;
  setPreferences: (pref: UserPreferences | null) => void;
  refreshPreferences: (user: firebase.User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userPreferences, setUserPreferences] =
    useState<UserPreferences | null>(null);
  const refreshPreferences = (user: firebase.User): void => {
    getUserPreferences(user)
      .then((pref) => {
        setUserPreferences(pref);
      })
      .catch((e) => {});
  };
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        createUser(user).catch((e) => {
          googleSignOut();
          toast.error('An error happened while logging in');
        });
        refreshPreferences(user);
      } else {
        setUserPreferences(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userPreferences,
        refreshPreferences,
        setPreferences: (pref) => {
          setUserPreferences(pref);
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
