import { createApi } from '@reduxjs/toolkit/query/react';
import { IDrivers, IParams } from '@/shared/types';
import { baseQueryWithReAuth } from './baseQuery';

interface IResult {
  results: IDrivers[];
  count: number;
}

export const driverApi = createApi({
  reducerPath: 'drivers',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Drivers'],
  endpoints: (builder) => ({
    getDrivers: builder.query<IResult, IParams>({
      query: ({ page, search }) =>
        `/user/driver/?search=${search}&page=${page || 1}`,
      transformResponse: (response: { results: IDrivers[]; count: number }) =>
        response,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Drivers' as const,
                id,
              })),
              { type: 'Drivers', id: 'LIST' },
            ]
          : [{ type: 'Drivers', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    getDriver: builder.query<IDrivers, string | undefined>({
      query: (driverID) => `/user/driver/${driverID}/`,
      providesTags: (result) =>
        result ? [{ type: 'Drivers', id: result.id }] : [],
      keepUnusedDataFor: 600,
    }),
    addDriver: builder.mutation<IDrivers, Partial<IDrivers>>({
      query: (driver) => ({
        url: '/user/driver/',
        method: 'POST',
        body: driver,
      }),
      invalidatesTags: [{ type: 'Drivers', id: 'LIST' }],
    }),
    editDriver: builder.mutation<IDrivers, Partial<IDrivers>>({
      query: ({ id, ...driver }) => ({
        url: `/user/driver/${id}/`,
        method: 'PATCH',
        body: driver,
      }),
      invalidatesTags: (arg) => [{ type: 'Drivers', id: arg?.id }],
    }),
  }),
});

export const {
  useGetDriverQuery,
  useGetDriversQuery,
  useAddDriverMutation,
  useEditDriverMutation,
} = driverApi;
