
import { supabase } from '@/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { error } = await supabase
    .from('ads')
    .update({ status: 'approved' })
    .eq('id', id);

  if (error) {
    console.error('Error approving ad:', error);
    // Redirect to an error page or show an error message
    return redirect('/moderator/error?message=Failed to approve ad');
  }

  // Revalidate the browse page to show the new ad
  revalidatePath('/browse');
  
  // Redirect to a success page
  redirect('/moderator/success');
}
