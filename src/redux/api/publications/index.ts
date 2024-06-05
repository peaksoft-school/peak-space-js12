import { api as index } from '..';
const OPEN_CAGE_API_KEY = import.meta.env.VITE_LOCATION_URL;

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		postCreateFile: builder.mutation<
			PROFIL.PostProfilResponse,
			PROFIL.PostProfilRequest
		>({
			query: (newData) => ({
				url: '/api/s3',
				method: 'POST',
				body: newData,
				responseHandler: 'text'
			}),
			invalidatesTags: ['post']
		}),

		deletePost: builder.mutation({
			query: (id) => ({
				url: `/posts/${id}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		patchPost: builder.mutation({
			query: ({ id, newData }) => ({
				url: `/posts/${id}`,
				method: 'PATCH',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),

		editGet: builder.query<PROFIL.CommentResponse, PROFIL.CommentRequest>({
			query: (id) => ({
				url: `/publics/find/${id}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),

		getMyPublication: builder.query<
			PROFIL.GetMyPublicationResponse,
			PROFIL.GetMyPublicationRequest
		>({
			query: () => ({
				url: '/publics/my',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
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
		}),
		getGeocode: builder.query<string, { latitude: number; longitude: number }>({
			query: ({ latitude, longitude }) => ({
				url: `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPEN_CAGE_API_KEY}`,
				method: 'GET'
			}),
			transformResponse: (response: {
				results: {
					components: {
						city?: string;
						town?: string;
						village?: string;
						country: string;
					};
				}[];
			}) => {
				const { results } = response;
				if (results && results.length > 0) {
					const { components } = results[0];
					return `${components.city || components.town || components.village}, ${components.country}`;
				} else {
					return 'Unknown location';
				}
			}
		})
	})
});
export const {
	usePostCreateFileMutation,
	useCreatePostMutation,
	useGetPublicsFoodQuery,
	usePostPublicFoodMutation,
	useGetPublicsVideoFoodQuery,
	useGetGeocodeQuery,
	useDeletePostMutation,
	useGetMyPublicationQuery,
	usePatchPostMutation,
	useEditGetQuery
} = api;
