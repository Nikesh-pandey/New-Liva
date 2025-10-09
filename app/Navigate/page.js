'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("OAuthSuccess component mounted");

    const token = searchParams.get('token');
    console.log("Token from URL:", token);

    if (token) {
      document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;

      window.history.replaceState({}, document.title, window.location.pathname);

      setTimeout(() => {
        router.push('/Card');
      }, 500);
    }
  }, [searchParams, router]);

  return <p>Logging you in...</p>;
}
