import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		poastRivateAccount: builder.mutation<
			PRIVATEACCOUNT.GetResponse,
			PRIVATEACCOUNT.GetRequest
		>({
			query: () => ({
				url: '/user-infos/close-account',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		})
	})
});

export const { usePoastRivateAccountMutation } = api;
