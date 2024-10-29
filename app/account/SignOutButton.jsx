import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { logout } from '../_lib/actions';

function SignOutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center gap-1 px-3.5 py-2 m-auto mt-1 font-semibold transition-colors rounded-lg bg-mydark text-white md:border border-mydark hover:border-myhover">
        <span>Sign out</span>
        <ArrowRightOnRectangleIcon height={17} />
      </button>
    </form>
  );
}

export default SignOutButton;
