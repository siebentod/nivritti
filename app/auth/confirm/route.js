import { createClient } from '../../_lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const code = searchParams.get('code');
  console.log('code', code);
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error && code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        // const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
        // const isLocalEnv = process.env.NODE_ENV === 'development';
        // if (isLocalEnv) {
        //   // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        //   return NextResponse.redirect(`${origin}${next}`);
        // } else if (forwardedHost) {
        //   return NextResponse.redirect(`http://${forwardedHost}${next}`);
        // } else {
          // return NextResponse.redirect(`${origin}${next}`);
          return NextResponse.redirect(`${origin}/?registration=success`);
        }
      }
    }

    return NextResponse.redirect(`${origin}/?error=error`);
  }
}
