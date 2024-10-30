import { createClient } from '../../_lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  console.log('url', url);
  const { searchParams, origin } = new URL(request.url);
  console.log('searchParams', searchParams);
  const token_hash = searchParams.get('token_hash');
  console.log('token_hash', token_hash);
  const type = searchParams.get('type');
  console.log('type', type);
  // const code = searchParams.get('code');
  // console.log('code', code);
  // const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    console.log('error', error);
    console.log('data', data);
    const code = data?.code;

    if (code) {
      console.log('gethere');
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      console.log('error2', error);
      if (!error) {
        console.log('no-error');
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
