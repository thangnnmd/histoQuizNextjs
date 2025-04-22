'use client';

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import dynamic from 'next/dynamic';
import { ErrorBoundary } from "react-error-boundary";

// Dynamically import SupabaseProvider with no SSR
const SupabaseProvider = dynamic(
  () => import("@/app/supabase-provider"),
  { ssr: false }
);

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">Something went wrong:</h2>
        <pre className="mt-2 rounded bg-red-100 p-4 text-sm">
          {error.message}
        </pre>
      </div>
    </div>
  );
}

export default function Providers({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SessionProvider session={session}>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
} 