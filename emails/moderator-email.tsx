
import React from 'react';

interface ModeratorEmailProps {
  ad: {
    id: string;
    title: string;
    description: string;
    imageurl: string;
  };
}

export const ModeratorEmail: React.FC<Readonly<ModeratorEmailProps>> = ({ ad }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const approveUrl = new URL(`/api/ads/${ad.id}/approve`, baseUrl).href;

  return (
    <div>
      <h1>New Ad Submission</h1>
      <h2>{ad.title}</h2>
      <p>{ad.description}</p>
      <img src={ad.imageurl} alt={ad.title} />
      <a href={approveUrl}>Approve & Publish</a>
    </div>
  );
};
