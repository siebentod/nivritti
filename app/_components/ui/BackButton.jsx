import Link from 'next/link';

function BackButton() {
  return (
    <>
      <Link
        className="z-30 absolute left-2 top-4 inline-flex items-center justify-center h-10 gap-0 pl-2 pr-4 text-sm font-semibold transition duration-200 ease-in-out select-none py-1 px-3 rounded-full disabled:hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-70 md:left-6 bg-mydark focus:outline-1 focus:outline-[#222c35] hover:shadow-[0_0_0_1px_#292929]"
        href="./"
      >
        <span className="text-[#70757E]">
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.25 8.75L9.75 12L13.25 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></path>
          </svg>
        </span>
        Home
      </Link>
    </>
  );
}

export default BackButton;
