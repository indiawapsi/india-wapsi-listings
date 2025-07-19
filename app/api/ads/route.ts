
import { supabase } from '@/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ModeratorEmail } from '@/emails/moderator-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const location = searchParams.get('location');

  let query = supabase.from('ads').select('*').eq('status', 'approved');

  if (category) {
    query = query.eq('category', category);
  }

  if (location) {
    query = query.eq('location', location);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { title, category, description, location, price, imageurl, name, email } = await request.json();
  
  const { data, error } = await supabase
    .from('ads')
    .insert([{ title, category, description, location, price, imageurl, status: 'pending', user_id: email }])
    .select();

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data && data.length > 0) {
    const newAd = data[0];
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'indiawapsi4@gmail.com',
        subject: 'New Ad Submission',
        react: ModeratorEmail({ ad: newAd, userName: name, userEmail: email }),
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }
  }

  return NextResponse.json(data);
}
