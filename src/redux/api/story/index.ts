import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getStory: build.query<STORY.GetStoryResponse, STORY.GetStoryRequest>({
			query: () => ({
				url: 'https://9db48a88f5769e2c.mokky.dev/storis',
				method: 'GET'
			}),
			providesTags: ['story']
		}),

		users: build.query<STORY.GetUsersResponse, STORY.GetUsersRequest>({
			query: ({ keyWord }) => ({
				url: `/users/search-with-all?${keyWord}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),

	
	})
});
export const { useGetStoryQuery, useUsersQuery,  } = api;
