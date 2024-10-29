function StatsTable({ counter, user_id }) {
  return (
    <>
      <p>
        Today{' '}
        <span className="text-yellow">
          {Math.round(counter.countToday * 10) / 10}
        </span>{' '}
        {Math.round(counter.countToday * 10) / 10 === 1 ? 'time' : 'times'},{' '}
        <span className="text-yellow">
          {Math.round(counter.minutesToday * 10) / 10}
        </span>{' '}
        min.{' '}
        {!user_id && (
          <span
            className="bg-zinc-900 hover:bg-zinc-800 rounded-full py-1 px-3 ml-2 text-sm text-yellow cursor-default"
            title="Stats are stored in cookies. You can sign in to store them on the server and get additional statistics."
          >
            !
          </span>
        )}
      </p>
      <p>
        Last week{' '}
        <span className="text-yellow">
          {Math.round(counter.countWeek * 10) / 10}
        </span>{' '}
        {Math.round(counter.countWeek * 10) / 10 === 1 ? 'time' : 'times'},{' '}
        <span className="text-yellow">
          {Math.round(counter.minutesWeek * 10) / 10}
        </span>{' '}
        min.
      </p>
      <p>
        Total{' '}
        <span className="text-yellow">
          {Math.round(counter.countAll * 10) / 10}
        </span>{' '}
        {Math.round(counter.countAll * 10) / 10 === 1 ? 'time' : 'times'},{' '}
        <span className="text-yellow">
          {Math.round(counter.minutesAll * 10) / 10}
        </span>{' '}
        min.
      </p>
    </>
  );
}

export default StatsTable;
