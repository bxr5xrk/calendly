import { useQuery } from 'react-query';
import { request } from '../../../../shared/lib/request/request';

export const usePublicEvents = () => {
  return useQuery({
    queryFn: () =>
      request<PublicEvent[]>({
        url: '2023/UA',
      }),
  });
};

export interface PublicEvent {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: null;
  launchYear: null;
  types: string[];
}
