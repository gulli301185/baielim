import { useAppDispatch, useAppSelector } from '@/app/hook';
import { logOut, setToken, userToken } from '@/app/slices/userSlice';
import { RefreshTokenResponse } from '@/shared/types';
import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

interface User {
  exp: number;
}

export const baseURL = 'https://baielim.ru/elim/api/';

export const useAxiosRequest = () => {
  const authTokens = useAppSelector(userToken);
  const dispatch = useAppDispatch();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!authTokens?.access) return req;

    const user = jwtDecode<User>(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post<RefreshTokenResponse>(
        `${baseURL}token/refresh/`,
        {
          refresh: authTokens.refresh,
        }
      );

      dispatch(
        setToken({
          access: response.data.access,
          refresh: authTokens.refresh,
        })
      );

      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      dispatch(logOut());
    }

    return req;
  });

  return axiosInstance;
};

export const axiosRequest = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});
