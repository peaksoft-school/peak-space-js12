import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<
			USERSCHAT.GetUsersResponse,
			USERSCHAT.GetUsersRequest
		>({
			query: () => ({
				url: 'https://e103c2c54ecd5cfc.mokky.dev/users',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});

export const {useGetUsersQuery} = api