import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getStoty: build.query<STORY.GetStoryResponse, STORY.GetStoryRequest>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/59d075c7dd3bf976bf84ab5fb0796ba4/storys',
				method: 'GET'
			}),
			providesTags: ['story']
		})
	})
});
export const { useGetStotyQuery } = api;
