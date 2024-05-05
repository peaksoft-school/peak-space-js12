import { api as index } from './../index';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPublications: builder.query<
			PROFIL.GetProfilResponse,
			PROFIL.GetProfilRequest
		>({
			query: () => ({
				url: 'https://bb0f8fe8d25ad084.mokky.dev/photo',
				method: 'GET'
			}),
			providesTags: ['post']
		}),
		postPublications: builder.mutation<
			PROFIL.PostProfilResponse,
			PROFIL.PostProfilRequest
		>({
			query: (newData) => ({
				url: 'https://bb0f8fe8d25ad084.mokky.dev/photo',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['post']
		})
	})
});

export const { useGetPublicationsQuery, usePostPublicationsMutation } = api;
