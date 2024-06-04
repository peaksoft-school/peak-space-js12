import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getBlockedUsers: builder.query<
			BLOCKEDUSERS.GetBlockedUsersResponse,
			BLOCKEDUSERS.GetBlockedUsersRequest
		>({
      query: () => ({
        url: 'https://ba6384db517d4072.mokky.dev/blockedUsers',
        method: 'GET'
      }),
      providesTags: ['blocked']
    })
	})
});

export const {useGetBlockedUsersQuery} = api