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
		}),
		getPublicsFood: builder.query<
			PROFIL.GetProfilResponse,
			PROFIL.GetProfilRequest
		>({
			query: () => ({
				url: 'https://d41d375ab7647ab0.mokky.dev/food',
				method: 'GET'
			}),
			providesTags: ['post']
		}),
		postPublicFood: builder.mutation<
			PROFIL.PostProfilResponse,
			PROFIL.PostProfilRequest
		>({
			query: (newItem) => ({
				url: 'https://d41d375ab7647ab0.mokky.dev/food',
				method: 'POST',
				body: newItem
			}),
			invalidatesTags: ['post']
		}),
		getPublicsVideoFood: builder.query<
			PROFIL.GetVideoResponse,
			PROFIL.GetVideoRequest
		>({
			query: () => ({
				url: 'https://d41d375ab7647ab0.mokky.dev/videoFoof',
				method: 'GET'
			}),
			providesTags: ['post']
		})
	})
});

export const {
	useGetPublicationsQuery,
	usePostPublicationsMutation,
	useGetPublicsFoodQuery,
	usePostPublicFoodMutation,
	useGetPublicsVideoFoodQuery
} = api;
