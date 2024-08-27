// import React, { useRef, useEffect, useState } from 'react';

function TriangleMode({
  inputHandle,
  manual,
  setManual,
  // timerState,
  isFocused,
  setIsFocused,
}) {
  const dec = function () {
    if (manual > 1) setManual((count) => count - 1);
  };

  const inc = function () {
    setManual((count) => count + 1);
  };

  const submitHandle = function (e) {
    e.preventDefault();
    setIsFocused(false);
    inputHandle(e);
  };

  // useEffect(() => {
  //   const handleFocus = () => setIsFocused(true);
  //   const handleBlur = () => setIsFocused(false);

  //   const button = buttonRef.current;

  //   if (button) {
  //     button.addEventListener('focus', handleFocus);
  //     button.addEventListener('blur', handleBlur);
  //   }

  //   return () => {
  //     if (button) {
  //       button.removeEventListener('focus', handleFocus);
  //       button.removeEventListener('blur', handleBlur);
  //     }
  //   };
  // }, []);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {isFocused && (
        <p
          style={{
            fontWeight: '300',
            fontSize: '13px',
            margin: 'auto',
            color: '#9ea0a3',
            position: 'absolute',
            transform: 'translate(0, -16px)',
            textAlign: 'center',
          }}
        >
          (You can press Space or Enter)
        </p>
      )}
      <form onSubmit={submitHandle}>
        <button
          autoFocus
          onBlur={() => {
            isFocused && setIsFocused(false);
          }}
          className="chooseTime"
        >
          {manual} min
        </button>
        <div className="inputContainer">
          <button type="button" className="manualSetButton" onClick={dec}>
            -
          </button>
          <input
            style={{
              ...(manual <= 0 && {
                backgroundColor: '#4b2727',
              }),
            }}
            value={manual.toString()}
            type="number"
            onChange={(e) => setManual(+e.target.value)}
          />
          <button type="button" className="manualSetButton" onClick={inc}>
            +
          </button>
        </div>
        {/* <input
      type="range"
      min="0"
      max="600"
      value={manual}
      onChange={(e) => setManual(e.target.value)}
    /> */}
      </form>
    </div>
  );
}

export default TriangleMode;
