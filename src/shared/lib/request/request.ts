import axios, { AxiosError, AxiosResponse } from 'axios';

export function request<T>(options: Record<string, unknown>): Promise<T> {
  const client = axios.create({
    baseURL: 'https://date.nager.at/api/v3/PublicHolidays/',
  });

  // request handler
  const onSuccess = (response: AxiosResponse<T>) => {
    const { data } = response;
    return data;
  };

  // error handler
  function onError(error: AxiosError) {
    return Promise.reject(error.response);
  }

  const response = client(options).then(onSuccess).catch(onError);
  // adding success and error handlers to client
  return response;
}
