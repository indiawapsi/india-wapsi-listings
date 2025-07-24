
import Link from 'next/link';

export default function ApprovalSuccessPage() {
  return (
    <div className="container mx-auto p-4 text-center text-black">
      <h1 className="text-2xl font-bold mb-4">Ad Approved!</h1>
      <p>The ad has been successfully approved and is now live.</p>
      <Link href="/browse" className="text-black hover:underline">
        View Live Ads
      </Link>
    </div>
  );
}
