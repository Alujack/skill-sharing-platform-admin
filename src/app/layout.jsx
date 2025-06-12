'use client'
import "./globals.css";
import Providers from "../provider/provider";
import { AuthProvider } from '@/context/authContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const publicRoutes = ['/auth/signin', '/auth/signup'];
    const currentPath = window?.location?.pathname;

    if (!token && !publicRoutes.includes(currentPath)) {
      router.push('/auth/signin');
      return;
    }

    if (user && token) {
      const role = user.role;
      console.log('User Role:', role);

      // Avoid redirecting if already at correct path
      if (role === 'admin' && !currentPath.startsWith('/admin')) {
        router.push('/admin');
      } else if (role === 'Instructor' && !currentPath.startsWith('/instructor')) {
        router.push('/instructor');
      }
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
