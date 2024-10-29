function Or() {
  return (
    <>
      <div className="flex items-center justify-center mt-2 mb-2">
        <div
          aria-hidden="true"
          className="w-full h-px bg-zinc-600"
          data-orientation="horizontal"
          role="separator"
        ></div>
        <span className="mx-4 text-xs font-normal text-zinc-100">OR</span>
        <div
          aria-hidden="true"
          className="w-full h-px bg-zinc-600"
          data-orientation="horizontal"
          role="separator"
        ></div>
      </div>
    </>
  );
}

export default Or;
