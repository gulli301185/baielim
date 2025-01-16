import { createApi } from '@reduxjs/toolkit/query/react';
import { IStories } from '@/shared/types';
import { baseQueryWithReAuth } from './baseQuery';

export const storyApi = createApi({
  reducerPath: 'stories',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Stories'],
  endpoints: (builder) => ({
    getStories: builder.query<IStories[], void>({
      query: () => '/category/stories/',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Stories' as const, id })),
              { type: 'Stories', id: 'LIST' },
            ]
          : [{ type: 'Stories', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    addStory: builder.mutation<IStories, Partial<IStories>>({
      query: (story) => ({
        url: '/category/stories/',
        method: 'POST',
        body: story,
      }),
      invalidatesTags: [{ type: 'Stories', id: 'LIST' }],
    }),
    editStory: builder.mutation<IStories, Partial<IStories>>({
      query: ({ id, ...story }) => ({
        url: `/category/stories/${id}/`,
        method: 'PATCH',
        body: story,
      }),
      invalidatesTags: (arg) => [{ type: 'Stories', id: arg?.id }],
    }),
    deleteStory: builder.mutation<{ success: boolean; id: number }, number>({
      query: (storyID) => ({
        url: `/category/stories/${storyID}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (arg) => [{ type: 'Stories', id: arg?.id }],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useAddStoryMutation,
  useEditStoryMutation,
  useDeleteStoryMutation,
} = storyApi;
