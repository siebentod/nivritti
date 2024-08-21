function TriangleMode({ inputHandle, manual, setManual }) {
  const dec = function () {
    if (manual > 1) setManual((count) => count - 1);
  };

  const inc = function () {
    setManual((count) => count + 1);
  };

  return (
    <div>
      <form onSubmit={inputHandle}>
        <button autoFocus className="chooseTime">
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
