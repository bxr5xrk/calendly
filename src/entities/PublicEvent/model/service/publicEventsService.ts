import { useQuery } from 'react-query';
import { request } from '../../../../shared/lib/request/request';
import { PublicEvent } from '../types/publicEvent';

export const usePublicEvents = () => {
  return useQuery({
    queryFn: () =>
      request<PublicEvent[]>({
        url: '2023/UA',
      }),
  });
};
