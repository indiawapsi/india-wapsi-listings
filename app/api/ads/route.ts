import { supabase } from '@/utils/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase.from('ads').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { title, category, description, location, price, imageurl } = await request.json();
  const { data, error } = await supabase
    .from('ads')
    .insert([{ title, category, description, location, price, imageurl }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
