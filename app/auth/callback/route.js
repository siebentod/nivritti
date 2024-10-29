import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '../../_lib/supabase/server';

export async function GET(request) {
  //   console.log('test');
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  //   console.log('code', code);
  // if "next" is in param, use it as the redirect URL

  //   const next = searchParams.get('next') ?? '/';
  const next = searchParams.get('next') ?? '/?oauth=success';

  if (code) {
    console.log('test 0.0');
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      console.log('test 0.1');
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        console.log('test1');
        console.log(origin, next);
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        console.log('test2');
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        console.log('test3');
        return NextResponse.redirect(`${origin}${next}`);
      }
      //   return NextResponse.redirect('/?registration=success');
    }
    NextResponse.redirect(`${origin}/?error=error`);
  }

  // return the user to an error page with instructions
  // return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  // return NextResponse.redirect(`${origin}/signup?error=auth-code-error`);
}
