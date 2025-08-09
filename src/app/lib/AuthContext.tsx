'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sdk } from '@farcaster/miniapp-sdk'; 
interface User {
  fid: number;
  username: string;
  pfpUrl: string;
  bio: string;
  displayName: string;
  followers: number;
  following: number;
  casts: number;
  replies: number;
  score: number;
}


interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Verify the incoming message
        const verifiedData = await sdk.verifySignInMessage();
        
        if (verifiedData && verifiedData.fid) {
          // Fetch user data using verified FID
          const res = await fetch(`/api/me?fid=${verifiedData.fid}`);
          
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            sdk.actions.ready();
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
