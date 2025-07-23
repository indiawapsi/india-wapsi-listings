import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/app/data/supabaseClient';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { adId, name, email, message } = await request.json();
    if (!adId || !name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let adDetailsHtml = '';
    let emailHeading = 'Ad Inquiry';
    if (adId !== 'contact-page') {
      const { data: ad, error } = await supabase.from('ads').select('*').eq('id', adId).single();
      if (ad && !error) {
        adDetailsHtml = `
          <div style="margin-bottom:18px;padding:18px 16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;">
            <div style="font-size:1.1rem;margin-bottom:6px;"><span style="color:#7c3aed;font-weight:600;">Ad Title:</span> ${ad.title}</div>
            <div style="margin-bottom:4px;"><strong>Category:</strong> ${ad.category}</div>
            <div style="margin-bottom:4px;"><strong>Location:</strong> ${ad.location}</div>
            <div style="margin-bottom:4px;"><strong>Price:</strong> ${ad.price}</div>
            <div style="margin-bottom:4px;"><strong>Description:</strong> ${ad.description}</div>
          </div>
        `;
      } else {
        adDetailsHtml = `<div style="margin-bottom:18px;color:#b91c1c;">Ad details could not be loaded.</div>`;
      }
    } else {
      emailHeading = 'Contact Request';
      adDetailsHtml = `<div style="margin-bottom:18px;padding:18px 16px;background:#fff;border-radius:8px;border:1px solid #e5e7eb;"><span style="color:#7c3aed;font-weight:600;font-size:1.1rem;">General Contact Request</span></div>`;
    }

    // Compose email content
    const emailHtml = `
      <div style="max-width:520px;margin:32px auto;padding:32px;background:#f9f9fb;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.07);font-family:Segoe UI,Arial,sans-serif;color:#222;">
        <h2 style="color:#5b21b6;font-size:1.7rem;margin-bottom:18px;">${emailHeading}</h2>
        ${adDetailsHtml}
        <p style="margin:0 0 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#2563eb;text-decoration:underline;">${email}</a></p>
        <p style="margin:18px 0 6px 0;"><strong>Message:</strong></p>
        <div style="background:#fff;border-radius:8px;padding:16px 14px;border:1px solid #e5e7eb;font-size:1.05rem;white-space:pre-line;">${message}</div>
      </div>
    `;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'indiawapsi4@gmail.com',
      subject: `${emailHeading}${adId !== 'contact-page' ? ` (Ad ID: ${adId})` : ''}`,
      html: emailHtml,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 