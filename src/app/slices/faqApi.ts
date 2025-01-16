import { IFAQ } from '@/shared/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from './baseQuery';

interface IResult {
  results: IFAQ[];
  count: number;
}

export const faqApi = createApi({
  reducerPath: 'faq',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['FAQ'],
  endpoints: (builder) => ({
    getFAQ: builder.query<IResult, number>({
      query: (page) => `/category/FAQ/?page${page || 1}`,
      transformResponse: (response: { results: IFAQ[]; count: number }) =>
        response,
      providesTags: (result: any) =>
        result
          ? [
              ...result.results.map(({ id }: { id: number }) => ({
                type: 'FAQ' as const,
                id,
              })),
              { type: 'FAQ', id: 'LIST' },
            ]
          : [{ type: 'FAQ', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    getFAQbyID: builder.query<IFAQ, string | undefined>({
      query: (faqID) => `/category/FAQ/${faqID}/`,
      providesTags: (result) =>
        result ? [{ type: 'FAQ', id: result.id }] : [],
      keepUnusedDataFor: 600,
    }),
    addFAQ: builder.mutation<IFAQ, Partial<IFAQ>>({
      query: (faq) => ({
        url: '/category/FAQ/',
        method: 'POST',
        body: faq,
      }),
      invalidatesTags: [{ type: 'FAQ', id: 'LIST' }],
    }),
    editFAQ: builder.mutation<IFAQ, Partial<IFAQ>>({
      query: (faq) => ({
        url: `/category/FAQ/${faq.id}/`,
        method: 'PATCH',
        body: faq,
      }),
      invalidatesTags: (arg) => [{ type: 'FAQ', id: arg?.id }],
    }),
    deleteFAQ: builder.mutation<{ success: boolean; id: number }, string>({
      query: (faqID) => ({
        url: `/category/FAQ/${faqID}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (arg) => [{ type: 'FAQ', id: arg?.id }],
    }),
  }),
});

export const {
  useGetFAQQuery,
  useGetFAQbyIDQuery,
  useAddFAQMutation,
  useDeleteFAQMutation,
  useEditFAQMutation,
} = faqApi;
