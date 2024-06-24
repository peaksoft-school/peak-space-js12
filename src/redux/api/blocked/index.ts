import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getBlockedUsers: builder.query<
			BLOCKEDUSERS.GetBlockedUsersResponse,
			BLOCKEDUSERS.GetBlockedUsersRequest
		>({
			query: () => ({
				url: '/user-infos/block-accounts',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),

		putBlockedUsers: builder.mutation<
			BLOCKEDUSERS.PutBlockedUsersResponse,
			BLOCKEDUSERS.PutBlockedUsersRequest
		>({
			query: ({ userId }) => ({
				url: `/user-infos/block/${userId}`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		})
	})
});

export const { useGetBlockedUsersQuery, usePutBlockedUsersMutation } = api;
