import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getStoty: build.query<STORY.GetStoryResponse, STORY.GetStoryRequest>({
			query: () => ({
				url: 'https://22638b4a9a5784ed.mokky.dev/story',
				method: 'GET'
			}),
			providesTags: ['story']
		})
	})
});
export const { useGetStotyQuery } = api;
