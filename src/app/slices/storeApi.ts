import { IParams, IStores } from '@/shared/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

interface IResult {
  results: IStores[];
  count: number;
}

export const storeApi = createApi({
  reducerPath: 'stores',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Stores'],
  endpoints: (builder) => ({
    getStores: builder.query<IResult, IParams>({
      query: ({
        page,
        search = '',
        store_agent = '',
        region = '',
        costType = '',
      }) =>
        `/user/store/?search=${search}&store_agent=${store_agent}&region=${region}&costType=${costType}&ordering=-dateCreated&page=${page}`,
      transformResponse: (response: { results: IStores[]; count: number }) =>
        response,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Stores' as const,
                id,
              })),
              { type: 'Stores', id: 'LIST' },
            ]
          : [{ type: 'Stores', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    getStore: builder.query<IStores, string | undefined>({
      query: (storeID) => `/user/store/${storeID}/`,
      providesTags: (result) =>
        result ? [{ type: 'Stores', id: result.id }] : [],
      keepUnusedDataFor: 600,
    }),
    addStore: builder.mutation<IStores, Partial<IStores>>({
      query: (store) => ({
        url: '/user/store/',
        method: 'POST',
        body: store,
      }),
      invalidatesTags: [{ type: 'Stores', id: 'LIST' }],
    }),
    editStore: builder.mutation<IStores, Partial<IStores>>({
      query: ({ id, ...store }) => ({
        url: `/user/store/${id}/`,
        method: 'PATCH',
        body: store,
      }),
      invalidatesTags: (arg) => [{ type: 'Stores', id: arg?.id }],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useAddStoreMutation,
  useEditStoreMutation,
  useGetStoreQuery,
} = storeApi;
