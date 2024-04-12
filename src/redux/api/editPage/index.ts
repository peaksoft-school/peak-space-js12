import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		postEdit: builder.mutation({
			query: (newData) => ({
				url: '',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['api']
		}),

		getEdit: builder.query({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['api']
		}),
		patchEdit: builder.mutation<Edit.PutResponse, Edit.PutRequest>({
			query: ({ id, newImg }) => ({
				url: `${id}`,
				method: 'PATCH',
				body: { newImg }
			}),
			invalidatesTags: ['api']
		})
	})
});

export const { useGetEditQuery, usePatchEditMutation, usePostEditMutation } =
	api;
