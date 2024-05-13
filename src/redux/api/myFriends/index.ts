import { api as index } from '..';
import { MYFRIENDS } from './types';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMyFriends: builder.query<
			MYFRIENDS.GetMyFriendsResponse,
			MYFRIENDS.GetMyFriendsRequest
		>({
			query: () => ({
				url: 'https://a0f2d006459bb950.mokky.dev/friends',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});

export const { useGetMyFriendsQuery } = api;
