import { IStocks } from '@/shared/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

export const stockApi = createApi({
  reducerPath: 'stocks',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Stocks'],
  endpoints: (builder) => ({
    getStocks: builder.query<IStocks[], void>({
      query: () => '/category/aksiya/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Stocks' as const, id })),
              { type: 'Stocks', id: 'LIST' },
            ]
          : [{ type: 'Stocks', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    addStock: builder.mutation<IStocks, Partial<IStocks>>({
      query: (stock) => ({
        url: '/category/aksiya/',
        method: 'POST',
        body: stock,
      }),
      invalidatesTags: [{ type: 'Stocks', id: 'LIST' }],
    }),
    editStock: builder.mutation<IStocks, Partial<IStocks>>({
      query: (stock) => ({
        url: `/category/aksiya/${stock.id}/`,
        method: 'PATCH',
        body: stock,
      }),
      invalidatesTags: (arg) => [{ type: 'Stocks', id: arg?.id }],
    }),
    deleteStock: builder.mutation<{ success: boolean; id: number }, number>({
      query: (stockID) => ({
        url: `/category/aksiya/${stockID}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (arg) => [{ type: 'Stocks', id: arg?.id }],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useAddStockMutation,
  useEditStockMutation,
  useDeleteStockMutation,
} = stockApi;
