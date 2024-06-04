import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getFavourites: builder.query<
			PROFILEFAVORITE.GetFavoriteResponse,
			PROFILEFAVORITE.GetFavoriteRequest
		>({
			query: () => ({
				url: '/posts/favorites',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['api']
		}),
		addFavorite: builder.mutation<
			PROFILEFAVORITE.PostFavoriteResponse,
			PROFILEFAVORITE.PostFavoriteRequest
		>({
			query: ({ id }) => ({
				url: `/posts/to-favorite/${id}`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		})
	})
});
export const { useGetFavouritesQuery, useAddFavoriteMutation } = api;
