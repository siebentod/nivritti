import { createClient } from './_lib/supabase/server';
import Home from './_components/Home';
import Links from './_components/Links';

// const Home = dynamic(() => import('./_components/Home'), { ssr: false });
// const session = await auth();

export default async function Page() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect('/');
  // }

  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Home user_id={data?.user?.id}>
        <Links user_id={data?.user?.id} />
      </Home>
    </div>
  );
}
