import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMainPage: build.query<MAIN.GetMainResponse, MAIN.GetMainRequest>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/8f21a715b862cb1cc8f3a8f8be5c1182/mainPage',
				method: 'GET'
			}),
			providesTags: ['main']
		})
	})
});
export const { useGetMainPageQuery } = api;
