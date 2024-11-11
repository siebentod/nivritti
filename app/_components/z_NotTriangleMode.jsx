// import React, { useRef, useEffect, useState } from 'react';

function TriangleMode({ setCurrentTimer, startTimer }) {
  return (
    <>
      <button
        autoFocus
        className="chooseTime bg-mydark"
        onClick={() => {
          setCurrentTimer(120);
          startTimer(120);
        }}
      >
        2 min
      </button>
      <button
        className="chooseTime bg-mydark"
        onClick={() => {
          setCurrentTimer(300);
          startTimer(300);
        }}
      >
        5 min
      </button>
      <button
        className="chooseTime bg-mydark"
        onClick={() => {
          setCurrentTimer(600);
          startTimer(600);
        }}
      >
        10 min
      </button>
    </>
  );
}

export default TriangleMode;
