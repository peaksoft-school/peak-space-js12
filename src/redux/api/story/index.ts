import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getStory: build.query<STORY.GetStoryResponse, STORY.GetStoryRequest>({
			query: () => ({
				url: 'https://9db48a88f5769e2c.mokky.dev/storis',
				method: 'GET'
			}),
			providesTags: ['story']
		})
	})
});
export const { useGetStoryQuery } = api;
