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
  token: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  token: null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Check if we have a stored token
        const storedToken = localStorage.getItem('farcaster-token');
        if (storedToken) {
          // Verify token expiration
          const payload = parseJwt(storedToken);
          if (payload.exp * 1000 > Date.now()) {
            setToken(storedToken);
            await fetchUserData(storedToken);
            return;
          }
        }

        // If no valid token, do quickAuth
        const { token: newToken } = await sdk.experimental.quickAuth();
        localStorage.setItem('farcaster-token', newToken);
        setToken(newToken);
        await fetchUserData(newToken);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('farcaster-token');
      } finally {
        setLoading(false);
        sdk.actions.ready();
      }
    };

    const fetchUserData = async (token: string) => {
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('User data fetch error:', error);
      }
    };

    authenticate();
  }, []);

  const logout = () => {
    localStorage.removeItem('farcaster-token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper to parse JWT without external library
function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

export const useAuth = () => useContext(AuthContext);
