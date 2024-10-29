import { redirect } from 'next/navigation';

import { createClient } from '../_lib/supabase/server';
import BackButton from '../_components/ui/BackButton';
import LoggedAs from './LoggedAs';
import SignOutButton from './SignOutButton';
import AccountStats from './AccountStats';

// OLD const session = await auth();
// const user_id = session.user.user_id;

export default async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <>
      <BackButton />
      <div className="text-center right-2 top-2 text-sm px-4 py-2.5 sm:relative md:fixed md:bg-zinc-800 md:border md:border-mydark rounded-lg">
        <LoggedAs data={data} />
        <SignOutButton />
      </div>
      <div className="grid min-h-screen">
        <AccountStats user_id={data.user.id} />
      </div>
    </>
  );
}
