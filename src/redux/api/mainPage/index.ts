import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMainPage: build.query<MAIN.GetMainResponse, MAIN.GetMainRequest>({
			query: () => ({
				url: '/publics/my-friend-publications',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['main']
		})
	})
});
export const { useGetMainPageQuery } = api;
