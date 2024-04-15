import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getFavourites: builder.query<
			PROFILFAVORITE.GetFavoriteResponse,
			PROFILFAVORITE.GetFavoriteRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/84b67c333f9f1e7867480714cc195b58/Favourites',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetFavouritesQuery } = api;
