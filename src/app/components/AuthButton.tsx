'use client';
import { SignInButton, useProfile } from '@farcaster/auth-kit';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const { profile, isAuthenticated } = useProfile();
  const router = useRouter();

  if (isAuthenticated && profile) {
    router.push('/editor');
  }

  return (
    <div className="w-full max-w-xs bg-gray-800 rounded-xl p-6">
      <SignInButton 
        onSuccess={() => router.push('/editor')}
      />
      {profile && (
        <div className="mt-4 flex items-center">
          <img 
            src={profile.pfpUrl} 
            alt={profile.username}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="text-gray-300">@{profile.username}</span>
        </div>
      )}
    </div>
  );
}
