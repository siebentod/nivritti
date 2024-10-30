'use client';

import { useEffect } from 'react';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

import { getData } from './_lib/actions';
import { usePageStore } from './_lib/store';
import { getDataNumbers } from './_utils/notcookies';
import { getCookieNumbers } from './_utils/cookies';
import { initialCounter } from './_utils/initialCounter';
import { arrayOfZeros, isLeapYear } from './_utils/arrayOfZeros';
import { moveDataToDb } from './_utils/moveCookiesToDb';

export function Providers({ children, user_id }) {
  return children;
}
