
'use client';
export const dynamic = "force-dynamic";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ApprovalErrorPageContent() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An unknown error occurred.';

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Approval Failed</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default function ApprovalErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApprovalErrorPageContent />
    </Suspense>
  );
}
