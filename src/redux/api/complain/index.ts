import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postComplain: build.mutation({
			query: ({ postId, newData }) => ({
				url: `/complains/${postId}?complain=${encodeURIComponent(newData.complain)}`,
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['post']
		})
	})
});

export const { usePostComplainMutation } = api;
