import Link from 'next/link';
import { UserIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Links({ user_id }) {
  return (
    <div className="fixed right-2 top-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <UserIcon className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!user_id ? (
            <>
              <DropdownMenuItem asChild>
                <Link href="/signin" className="w-full">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup" className="w-full">
                  Register
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild>
              <Link href="/account" className="w-full flex items-center gap-2">
                Account
                <UserIcon className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link href="/about" className="w-full flex items-center gap-2">
              About
              <InformationCircleIcon className="h-4 w-4" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
