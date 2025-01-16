import { createApi } from '@reduxjs/toolkit/query/react';
import { ICostType } from '@/shared/types';
import { baseQueryWithReAuth } from './baseQuery';

export const costTypeApi = createApi({
  reducerPath: 'costType',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['CostType'],
  endpoints: (builder) => ({
    getCostType: builder.query<ICostType[], void>({
      query: () => '/category/costType/',
      keepUnusedDataFor: 600,
    }),
  }),
});

export const { useGetCostTypeQuery } = costTypeApi;
