import { createApi } from '@reduxjs/toolkit/query/react';
import { IRegion } from '@/shared/types';
import { baseQueryWithReAuth } from './baseQuery';

interface IResult {
  results: IRegion[];
  count: number;
}

export const regionApi = createApi({
  reducerPath: 'regions',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Regions'],
  endpoints: (builder) => ({
    getRegions: builder.query<IResult, number>({
      query: (page) => `/category/region/?page=${page || 1}`,
      transformResponse: (response: { results: IRegion[]; count: number }) =>
        response,
      providesTags: (result: any) =>
        result
          ? [
              ...result.results.map(({ id }: { id: number }) => ({
                type: 'Regions' as const,
                id,
              })),
              { type: 'Regions', id: 'LIST' },
            ]
          : [{ type: 'Regions', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    addRegion: builder.mutation<IRegion, Partial<IRegion>>({
      query: (region) => ({
        url: '/category/region/',
        method: 'POST',
        body: region,
      }),
      invalidatesTags: [{ type: 'Regions', id: 'LIST' }],
    }),
    editRegion: builder.mutation<IRegion, Partial<IRegion>>({
      query: (region) => ({
        url: `/category/region/${region.id}/`,
        method: 'PATCH',
        body: region,
      }),
      invalidatesTags: (arg) => [{ type: 'Regions', id: arg?.id }],
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useAddRegionMutation,
  useEditRegionMutation,
} = regionApi;
