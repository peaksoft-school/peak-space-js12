import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getFavourites: builder.query<
			PROFILFAVORITE.GetFavoriteResponse,
			PROFILFAVORITE.GetFavoriteRequest
		>({
			query: () => ({
				url: 'https://bb0f8fe8d25ad084.mokky.dev/favorite',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetFavouritesQuery } = api;
