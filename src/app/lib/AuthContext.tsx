'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await sdk.quickAuth.fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/me`);
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          sdk.actions.ready();
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
