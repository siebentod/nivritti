import Link from 'next/link';
import { UserIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

export default function Links({ user_id }) {
  return (
    <div className="fixed right-2 top-2 text-center py-1.5 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm leading-none">
      <div class="grid auto-cols-auto gap-0 border-gray-300">
        {!user_id ? (
          <>
            <div className="flex">
              <div className="border-b pb-1 border-gray-300 px-0.5 text-center">
                <Link
                  className="hover:text-zinc-200 active:text-zinc-400 flex gap-0.5 justify-center"
                  href="/signin"
                >
                  Login
                </Link>
              </div>
              <div className="border-b pb-1 border-gray-300 text-center">
                <UserIcon height={14} />
              </div>
              <div class="border-b pb-1 border-gray-300 px-0.5 text-center">
                <Link
                  className="hover:text-zinc-200 active:text-zinc-400 flex gap-0.5 justify-center"
                  href="/signup"
                >
                  Register
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div class="pb-1 col-span-2 border-b border-gray-300 text-center">
            <Link
              className="hover:text-zinc-200 active:text-zinc-400 flex gap-0.5 justify-center"
              href="/account"
            >
              Account
              <UserIcon height={14} />
            </Link>
          </div>
        )}
        <div class="pt-[3px] col-span-2 text-center">
          <Link
            className="hover:text-zinc-200 active:text-zinc-400 flex gap-0.5 justify-center"
            href="/about"
          >
            About
            <InformationCircleIcon height={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
