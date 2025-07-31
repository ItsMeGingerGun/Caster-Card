import { AuthKitProvider, getDefaultConfig } from '@farcaster/auth-kit';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getRedisClient } from './redis';

const authKitConfig = getDefaultConfig({
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: 'castercard.xyz',
  siweUri: 'https://castercard.xyz/login',
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Farcaster',
      credentials: {
        message: { label: 'Message', type: 'text' },
        signature: { label: 'Signature', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        
        // Extract FID from signed message
        const fidMatch = credentials.message.match(/FID:(\d+)/);
        if (!fidMatch) return null;
        
        const fid = parseInt(fidMatch[1]);
        
        // Store session in Redis
        const redis = getRedisClient();
        await redis.hset(`user:${fid}:session`, {
          signedMessage: credentials.message,
          signature: credentials.signature,
          lastActive: Date.now(),
        });
        
        return {
          id: fid.toString(),
          fid,
          name: 'Farcaster User',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.fid = user.fid;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.fid = token.fid;
      
      // Retrieve session data from Redis
      const redis = getRedisClient();
      const sessionData = await redis.hgetall(`user:${session.user.fid}:session`);
      
      if (sessionData) {
        session.user.sessionData = {
          signedMessage: sessionData.signedMessage,
          signature: sessionData.signature,
        };
      }
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function FarcasterAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthKitProvider config={authKitConfig}>
      {children}
    </AuthKitProvider>
  );
}
