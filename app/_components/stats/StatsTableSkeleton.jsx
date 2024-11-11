function StatsTableSkeleton() {
  return (
    <>
      <div className="">
        Today{' '}
        <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>{' '}
        times,{' '}
        <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>{' '}
        min.
      </div>
      <div>
        Last week{' '}
        <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>{' '}
        times,{' '}
        <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>{' '}
        min.
      </div>
      <div>
        Total{' '}
        <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>{' '}
        times,{' '}
        <div className="skeleton h-3.5 w-3 inline-block bg-zinc-700 rounded-sm align-text-top"></div>{' '}
        min.
      </div>
    </>
  );
}

export default StatsTableSkeleton;
