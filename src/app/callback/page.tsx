'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sdk } from '@farcaster/miniapp-sdk';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle the authentication callback
        await sdk.quickAuth.getTokenFromCallback(window.location.href);
        
        // Close the modal and redirect to home
        sdk.actions.closeModal();
        router.push('/');
      } catch (error) {
        console.error('Authentication callback failed:', error);
        router.push('/?error=auth_failed');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}
