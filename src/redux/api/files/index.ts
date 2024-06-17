import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postApi: build.mutation({
			query: (newData) => ({
				url: '/stories',
				method: 'POST',
				body: newData,
				headers: {
					// Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['story']
		})
	})
});
export const { usePostApiMutation } = api;
