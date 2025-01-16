import { IItem, IItemMargins, IParams } from '@/shared/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

interface IResult {
  results: IItem[];
  count: number;
}

export const itemApi = createApi({
  reducerPath: 'items',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getItems: builder.query<IResult, IParams>({
      query: ({ page, search = '', category = '', author = '' }) =>
        `/core/item/?search=${search}&category=${category}&author=${author}&page=${
          page || 1
        }`,
      transformResponse: (response: { results: IItem[]; count: number }) =>
        response,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Items' as const,
                id,
              })),
              { type: 'Items', id: 'LIST' },
            ]
          : [{ type: 'Items', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    getItem: builder.query<IItem, string | undefined>({
      query: (itemID) => `/core/item/${itemID}/`,
      providesTags: (result) =>
        result ? [{ type: 'Items', id: result.id }] : [],
      keepUnusedDataFor: 600,
    }),
    addItem: builder.mutation<IItem, Partial<IItem>>({
      query: (agent) => ({
        url: '/core/item/',
        method: 'POST',
        body: agent,
      }),
      invalidatesTags: [{ type: 'Items', id: 'LIST' }],
    }),
    editItem: builder.mutation<IItem, Partial<IItem>>({
      query: ({ id, ...item }) => ({
        url: `/core/item/${id}/`,
        method: 'PATCH',
        body: item,
      }),
      invalidatesTags: (arg) => [{ type: 'Items', id: arg?.id }],
    }),
    getItemMargins: builder.query<IItemMargins[], void>({
      query: () => `/core/marginality/`,
      transformResponse: (response: { data: IItemMargins[] }) => response.data,
      keepUnusedDataFor: 1200,
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useGetItemQuery,
  useGetItemMarginsQuery,
} = itemApi;
