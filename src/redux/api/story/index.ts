import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getStory: build.query<STORY.GetStoryResponse, STORY.GetStoryRequest>({
			query: () => ({
				url: `/stories/all`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['story']
		}),
		PostStory: build.mutation({
			query: (newData) => ({
				url: 'https://9db48a88f5769e2c.mokky.dev/storis',
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['story']
		})
	})
});
export const { useGetStoryQuery, usePostStoryMutation } = api;
