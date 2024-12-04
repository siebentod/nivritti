import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { logout } from '../_lib/actions';

function SignOutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center gap-1 px-3.5 py-2 m-auto mt-1.5 font-semibold transition-colors rounded-lg bg-zinc-800 border border-[#0a0a0a] text-white md:border hover:border-myhover">
        <span>Sign out</span>
        <ArrowRightOnRectangleIcon height={17} />
      </button>
    </form>
  );
}

export default SignOutButton;
