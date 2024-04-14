import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getUserPhoto: builder.query<
			PROFILPHOTO.GetPhotoResponse,
			PROFILPHOTO.GetPhotoRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/af9cc58a80b6b4e2ea02e23625f30255/userPhoto',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetUserPhotoQuery } = api;
