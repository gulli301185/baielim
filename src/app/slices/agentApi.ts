import { createApi } from '@reduxjs/toolkit/query/react';
import { IAgents, IParams } from '@/shared/types';
import { baseQueryWithReAuth } from './baseQuery';

interface IResult {
  results: IAgents[];
  count: number;
}

export const agentApi = createApi({
  reducerPath: 'agents',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Agents'],
  endpoints: (builder) => ({
    getAgents: builder.query<IResult, IParams>({
      query: ({ page, search }) =>
        `/user/agent/?search=${search}&page=${page || 1}`,
      transformResponse: (response: { results: IAgents[]; count: number }) =>
        response,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Agents' as const,
                id,
              })),
              { type: 'Agents', id: 'LIST' },
            ]
          : [{ type: 'Agents', id: 'LIST' }],
      keepUnusedDataFor: 600,
    }),
    getAgent: builder.query<IAgents, string | undefined>({
      query: (agentID) => `/user/agent/${agentID}/`,
      providesTags: (result) =>
        result ? [{ type: 'Agents', id: result.id }] : [],
      keepUnusedDataFor: 600,
    }),
    addAgent: builder.mutation<IAgents, Partial<IAgents>>({
      query: (agent) => ({
        url: '/user/agent/',
        method: 'POST',
        body: agent,
      }),
      invalidatesTags: [{ type: 'Agents', id: 'LIST' }],
    }),
  }),
});

export const { useGetAgentsQuery, useAddAgentMutation, useGetAgentQuery } =
  agentApi;
