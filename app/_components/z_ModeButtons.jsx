export default function ModeButtons({ setMode }) {
  return (
    <div className="modeButtons">
      <button onClick={() => setMode('square')}>
        <svg viewBox="0 0 24 24" fill="none">
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            stroke="#000000"
            strokeWidth="2"
          />
        </svg>
      </button>
      <button onClick={() => setMode('triangle')}>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            stroke="#000000"
            strokeWidth="2"
            d="M11.125 2.584a1 1 0 011.75 0l8.805 15.932A1 1 0 0120.805 20H3.195a1 1 0 01-.875-1.484l8.805-15.932z"
          ></path>
        </svg>
      </button>
      <button onClick={() => setMode('circle')}>
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}
