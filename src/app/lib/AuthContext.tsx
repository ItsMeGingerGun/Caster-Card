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
  registeredAt: string;
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
        // Check if we have a token in cookies
        const token = getCookie('farcaster-token');
        
        if (token) {
          // Set token in SDK
          sdk.setAuthToken(token);
          
          // Verify token
          const isValid = await sdk.quickAuth.verify();
          
          if (isValid) {
            // Get user FID from token
            const userInfo = await sdk.quickAuth.getUser();
            const fid = userInfo.fid;
            
            // Fetch user stats
            const res = await fetch(`/api/me?fid=${fid}`);
            if (res.ok) {
              const userData = await res.json();
              setUser(userData);
            }
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

// Helper function to get cookies
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}
