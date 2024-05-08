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

interface UserContextType {
  user: firebase.User | null;
  setUser: React.Dispatch<React.SetStateAction<firebase.User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        createUser(user).catch((e) => {
          googleSignOut();
          toast.error('An error happened while logging in');
        });
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
