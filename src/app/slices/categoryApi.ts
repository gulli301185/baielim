import { createApi } from '@reduxjs/toolkit/query/react';
import { ICategory } from '@/shared/types';
import { baseQueryWithReAuth } from './baseQuery';

export const categoryApi = createApi({
  reducerPath: 'categories',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => '/category/category/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Categories' as const, id })),
              { type: 'Categories', id: 'LIST' },
            ]
          : [{ type: 'Categories', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    addCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (category) => ({
        url: '/category/category/',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),
    editCategory: builder.mutation<ICategory, Partial<ICategory>>({
      query: (category) => ({
        url: `/category/category/${category.id}/`,
        method: 'PATCH',
        body: category,
      }),
      invalidatesTags: (arg) => [{ type: 'Categories', id: arg?.id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
} = categoryApi;
