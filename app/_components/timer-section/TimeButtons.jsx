function TimeButtons({
  manualTime,
  setManualTime,
  setIsFocused,
  inputHandle,
  isFocused,
}) {
  const dec = function () {
    if (manualTime > 1) setManualTime((count) => count - 1);
  };

  const inc = function () {
    setManualTime((count) => count + 1);
  };

  const submitHandle = function (e) {
    e.preventDefault();
    setIsFocused(false);
    inputHandle(e);
  };

  return (
    <div className="chooseButtons">
      <div className="relative flex flex-col items-center">
        {isFocused && (
          <p className="youCanPressSpaceOrEnter">
            (You can press Space or Enter)
          </p>
        )}
        <form onSubmit={submitHandle}>
          <button
            autoFocus
            onBlur={() => {
              isFocused && setIsFocused(false);
            }}
            className="chooseTime bg-mydark"
          >
            {manualTime} min
          </button>
          <div className="flex justify-center mt-2 inputContainer">
            <button
              type="button"
              className="bg-zinc-900 my-0 mx-[1px] p-0 pb-0.5 w-[2ch] rounded-[5%] hover:border-zinc-800"
              onClick={dec}
            >
              -
            </button>
            <input
              className="w-16 text-center bg-zinc-600 border-zinc-700 focus:outline focus:outline-1 focus:outline-zinc-400"
              style={{
                ...(manualTime <= 0 && {
                  backgroundColor: '#4b2727',
                }),
              }}
              value={manualTime.toString()}
              type="number"
              onChange={(e) => setManualTime(+e.target.value)}
            />
            <button
              type="button"
              className="bg-zinc-900 my-0 mx-[1px] p-0 pb-0.5 w-[2ch] rounded-[5%] hover:border-zinc-800"
              onClick={inc}
            >
              +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TimeButtons;
