import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		postApi: build.mutation({
			query: (newData) => ({
				url: '/api/s3',
				method: 'POST',
				body: newData,
				headers: {
					// Authorization: `Bearer ${localStorage.getItem('auth_token')}`
					'Content-Type': 'application/json'
				}
			}),
			invalidatesTags: ['api']
		})
	})
});
export const { usePostApiMutation } = api;
