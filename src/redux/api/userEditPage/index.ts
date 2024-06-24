import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getUserInfo: builder.query<
			USEREDITPAGE.GetUserInfoResponse,
			USEREDITPAGE.GetUserInfoRequest
		>({
			query: () => ({
				url: '/user-infos',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['api']
		})
	})
});

export const { useGetUserInfoQuery } = api;
