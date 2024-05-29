import { api as index } from './../index';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		postCreateFile: builder.mutation<
			PROFIL.PostProfilResponse,
			PROFIL.PostProfilRequest
		>({
			query: (newData) => ({
				url: '/files/upload',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['post']
		}),

		createPost: builder.mutation({
			query: (data) => ({
				url: '/posts',
				method: 'POST',
				body: data,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
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
	usePostCreateFileMutation,
	useCreatePostMutation,
	useGetPublicsFoodQuery,
	usePostPublicFoodMutation,
	useGetPublicsVideoFoodQuery
} = api;
