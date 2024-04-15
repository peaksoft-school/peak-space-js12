import { api as index } from './../index';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPublications: builder.query<
			PROFIL.GetProfilResponse,
			PROFIL.GetProfilRequest
		>({
			query: () => ({
				url: '/publications',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetPublicationsQuery } = api;
