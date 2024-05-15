import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getUserPhoto: builder.query<
			PROFILPHOTO.GetPhotoResponse,
			PROFILPHOTO.GetPhotoRequest
		>({
			query: () => ({
				url: 'https://bb0f8fe8d25ad084.mokky.dev/photoWithyou',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetUserPhotoQuery } = api;
