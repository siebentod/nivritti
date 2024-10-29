function GoogleButton({ children, isSubmitting }) {
  return (
    <>
      <button
        type="submit"
        className="relative inline-flex items-center justify-center w-full h-10 gap-1 pl-4 pr-4 text-sm font-semibold transition duration-200 ease-in-out border rounded-md cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-900 border-mydark dark:text-zinc-100 bg-zinc-600 text-zinc-50 hover:border-myhover focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:outline-none focus-visible:bg-zinc-800"
        disabled={isSubmitting}
      >
        <span className="absolute inset-0 flex items-center justify-center invisible w-full">
          <span className="inline-flex items-center gap-1">
            <span className="w-1 h-1 rounded-full animate-plop bg-zinc-100"></span>
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
            <g clipPath="url(#clip0_829_635)">
              <path
                d="M19.8094 12.1497C19.8094 11.4942 19.7562 11.0158 19.6411 10.5198H12.1558V13.4784H16.5495C16.4609 14.2137 15.9826 15.321 14.9195 16.0651L14.9046 16.1641L17.2714 17.9976L17.4353 18.0139C18.9412 16.6232 19.8094 14.5769 19.8094 12.1497Z"
                fill="#959AA1"
              ></path>
              <path
                d="M12.1557 19.945C14.3083 19.945 16.1153 19.2363 17.4353 18.0139L14.9195 16.065C14.2463 16.5345 13.3427 16.8623 12.1557 16.8623C10.0474 16.8623 8.25806 15.4716 7.6202 13.5493L7.5267 13.5573L5.06575 15.4618L5.03357 15.5513C6.34459 18.1556 9.03754 19.945 12.1557 19.945Z"
                fill="#70757E"
              ></path>
              <path
                d="M7.62023 13.5494C7.45193 13.0533 7.35453 12.5218 7.35453 11.9726C7.35453 11.4233 7.45193 10.8918 7.61138 10.3958L7.60692 10.2901L5.11514 8.35498L5.03361 8.39376C4.49327 9.47449 4.18323 10.6881 4.18323 11.9726C4.18323 13.257 4.49327 14.4706 5.03361 15.5513L7.62023 13.5494Z"
                fill="#959AA1"
              ></path>
              <path
                d="M12.1557 7.08269C13.6527 7.08269 14.6626 7.72934 15.2384 8.26974L17.4884 6.07286C16.1065 4.7884 14.3083 4 12.1557 4C9.03754 4 6.34459 5.78937 5.03357 8.39371L7.61134 10.3957C8.25806 8.47347 10.0474 7.08269 12.1557 7.08269Z"
                fill="#70757E"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_829_635">
                <rect
                  fill="white"
                  height="16"
                  transform="translate(4 4)"
                  width="16"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </span>
        <span className="inline-flex items-center justify-center visible gap-1 truncate">
          {children}
        </span>
      </button>
    </>
  );
}

export default GoogleButton;
