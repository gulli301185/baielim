import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { AppDispatch, RootState } from '../store';
import { baseURL } from '@/shared/utils/helpers/axiosRequest';
import { logOut, setToken } from './userSlice';
import { RefreshTokenResponse } from '@/shared/types';

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token?.access;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).user.token?.refresh;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/token/refresh/',
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { access } = refreshResult.data as RefreshTokenResponse;

        (api.dispatch as AppDispatch)(
          setToken({
            access,
            refresh: refreshToken,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        (api.dispatch as AppDispatch)(logOut());
      }
    } else {
      (api.dispatch as AppDispatch)(logOut());
    }
  }

  return result;
};
