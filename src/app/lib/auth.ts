import { AuthKitProvider, getDefaultConfig } from '@farcaster/auth-kit';

const authKitConfig = getDefaultConfig({
  relay: 'https://relay.farcaster.xyz',
  rpcUrl: 'https://mainnet.optimism.io',
  domain: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  siweUri: '/login',
});

export function FarcasterAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthKitProvider config={authKitConfig}>
      {children}
    </AuthKitProvider>
  );
}

// Simplified signature verification (for demo purposes)
export async function verifySignature(message: string, signature: string, address: string) {
  // In a production app, you would verify the signature properly
  // For this demo, we'll just check that all parameters exist
  return !!message && !!signature && !!address;
}
