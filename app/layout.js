import { Providers } from './Providers';
import localFont from 'next/font/local';
import './globals.css';
import { createClient } from './_lib/supabase/server';
// import { auth } from './_lib/auth';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Nivritti | Do Nothing App',
  description: "Don't-Move-Your-Mouse, Do-Nothing App",
};

const font = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});

const geistSans = localFont({
  src: './_fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './_fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// let singulars, totals;
// if (session) {
//   ({ singulars, totals } = await getData(session.user.user_id));
// }

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect('/');
  // }
  // console.log('user', data?.user);

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {/* <Providers>{children}</Providers> */}
        <Providers user_id={data?.user?.id}>{children}</Providers>
      </body>
    </html>
  );
}
