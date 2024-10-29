'use client';

import { usePageStore } from '../_lib/store';
import Heatmap from './Heatmap';
import ResetAllStats from './ResetAllStats';

function AccountStats({ user_id }) {
  const counter = usePageStore((state) => state.counter);
  const mode = usePageStore((state) => state.mode);
  if (mode === 'cookies') return;
  // console.log('counter', counter);

  return (
    <>
      <div className="m-auto mt-2 text-center py-3 px-12 bg-zinc-800 border border-zinc-700 rounded-lg">
        <div className="w-[250px] m-auto">
          {!isNaN(counter?.activity?.length) ? (
            <Heatmap counter={counter} />
          ) : (
            <div className="skeleton h-[370px] w-[250px] bg-zinc-700 rounded-sm m-auto"></div>
          )}
        </div>
        <div className="mt-4 text-left">
          <div>
            Current streak:{' '}
            {!isNaN(counter.streak) ? (
              <span className="text-yellow">{counter.streak}</span>
            ) : (
              <div className="skeleton h-4 w-3 inline-block bg-zinc-700 rounded-sm align-text-bottom"></div>
            )}
          </div>
          <div className="m-auto grid grid-cols-[1fr_auto]">
            <div className="w-auto">
              Longest streak:{' '}
              {!isNaN(counter.streak) ? (
                <span className="text-yellow">...</span>
              ) : (
                <div className="skeleton h-4 w-3 inline-block bg-zinc-700 rounded-sm align-text-bottom"></div>
              )}
            </div>
            <button className="ml-1 py-0 px-4 bg-mydark border border-mydark hover:border-myhover">
              Reset
            </button>
            <div>
              Longest nothingdoing:{' '}
              {!isNaN(counter.streak) ? (
                <span className="text-yellow">...</span>
              ) : (
                <div className="skeleton h-4 w-3 inline-block bg-zinc-700 rounded-sm align-text-bottom"></div>
              )}
            </div>
            <button className="ml-1 py-0 px-4 bg-mydark border border-mydark hover:border-myhover">
              Reset
            </button>
          </div>
        </div>
        <ResetAllStats user_id={user_id} />
      </div>
    </>
  );
}

export default AccountStats;
