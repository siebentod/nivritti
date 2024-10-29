import { useQuery } from '@tanstack/react-query';
import { getData } from './_lib/apiSupabase';

export function useData(user_id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['data', user_id],
    queryFn: getData,
  });

  return { isLoading, error, data };
}
