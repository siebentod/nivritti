function GithubButton({ children, isSubmitting }) {
  return (
    <>
      <button
        type="submit"
        className="relative inline-flex items-center justify-center w-full h-10 gap-1 pl-4 pr-4 text-sm font-semibold transition duration-200 ease-in-out border rounded-md cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-70 border-mydark dark:text-zinc-100 bg-zinc-900 text-zinc-50 hover:border-myhover focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:outline-none focus-visible:bg-zinc-800 disabled:hover:bg-zinc-800"
        disabled={isSubmitting}
      >
        <span className="absolute inset-0 flex items-center justify-center invisible w-full">
          <span className="inline-flex items-center gap-1">
            <span className="w-1 h-1 rounded-full animate-plop bg-zinc-950"></span>
            <span className="w-1 h-1 rounded-full animate-plop2 bg-zinc-950"></span>
            <span className="w-1 h-1 rounded-full animate-plop3 bg-zinc-950"></span>
          </span>
        </span>
        <span className="text-[#70757E] visible">
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C7.58267 4 4 7.67255 4 12.2022C4 15.8263 6.292 18.9007 9.47133 19.9855C9.87067 20.0614 10 19.8071 10 19.5911V18.0641C7.77467 18.5603 7.31133 17.0962 7.31133 17.0962C6.94733 16.1482 6.42267 15.896 6.42267 15.896C5.69667 15.3868 6.478 15.3977 6.478 15.3977C7.28133 15.4551 7.704 16.2432 7.704 16.2432C8.41733 17.4968 9.57533 17.1345 10.032 16.9247C10.1033 16.395 10.3107 16.0327 10.54 15.8283C8.76333 15.6198 6.89533 14.9165 6.89533 11.7744C6.89533 10.8783 7.208 10.1469 7.71933 9.57274C7.63667 9.36563 7.36267 8.53106 7.79733 7.40188C7.79733 7.40188 8.46933 7.18179 9.998 8.24261C10.636 8.06079 11.32 7.96989 12 7.96647C12.68 7.96989 13.3647 8.06079 14.004 8.24261C15.5313 7.18179 16.202 7.40188 16.202 7.40188C16.6373 8.53174 16.3633 9.36632 16.2807 9.57274C16.794 10.1469 17.104 10.8789 17.104 11.7744C17.104 14.9247 15.2327 15.6185 13.4513 15.8215C13.738 16.0758 14 16.5747 14 17.3403V19.5911C14 19.8091 14.128 20.0655 14.534 19.9848C17.7107 18.8987 20 15.8249 20 12.2022C20 7.67255 16.418 4 12 4Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        <span className="inline-flex items-center justify-center visible gap-1 truncate">
          {children}
        </span>
      </button>
    </>
  );
}

export default GithubButton;
