import React from 'react';

interface ModeratorEmailProps {
  ad: {
    id: string;
    title: string;
    description: string;
    imageurl: string;
  };
  userName: string;
  userEmail: string;
}

const containerStyle = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  backgroundColor: '#f4f4f7',
  padding: '40px 20px',
};

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '30px',
  maxWidth: '600px',
  margin: '0 auto',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '10px',
};

const subHeadingStyle = {
  fontSize: '18px',
  color: '#333',
  marginBottom: '20px',
};

const textStyle = {
  fontSize: '16px',
  color: '#555',
  lineHeight: '1.6',
};

const buttonStyle = {
  display: 'inline-block',
  backgroundColor: '#28a745',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '5px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  marginTop: '25px',
};

const imageStyle = {
  maxWidth: '100%',
  borderRadius: '6px',
  marginTop: '20px',
};

const footerStyle = {
  textAlign: 'center' as const,
  marginTop: '30px',
  color: '#888',
  fontSize: '14px',
};

export const ModeratorEmail: React.FC<Readonly<ModeratorEmailProps>> = ({ ad, userName, userEmail }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const approveUrl = new URL(`/api/ads/${ad.id}/approve`, baseUrl).href;
  const adUrl = new URL(`/ads/${ad.id}`, baseUrl).href;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>New Ad Submission</h1>
        <p style={textStyle}>A new ad has been submitted and is waiting for your approval.</p>

        <h2 style={subHeadingStyle}>{ad.title}</h2>
        {ad.imageurl && <img src={ad.imageurl} alt={ad.title} style={imageStyle} />}
        <p style={textStyle}>{ad.description}</p>
        
        <hr style={{ border: 'none', borderTop: '1px solid #eaeaea', margin: '26px 0' }} />

        <p style={textStyle}>
          <strong>Submitted by:</strong> {userName}
          <br />
          <strong>Email:</strong> {userEmail}
        </p>
        
        <p style={textStyle}>
          <a href={adUrl} target="_blank" rel="noopener noreferrer" style={{color: '#007bff'}}>View Ad Details</a>
        </p>

        <a href={approveUrl} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          Approve & Publish Ad
        </a>
      </div>
      <div style={footerStyle}>
        <p>India Wapsi | Moderator Panel</p>
      </div>
    </div>
  );
};
