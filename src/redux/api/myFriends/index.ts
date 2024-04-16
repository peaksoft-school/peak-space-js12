import { api as index } from '..';
import { MYFRIENDS } from './types';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMyFriends: builder.query<
			MYFRIENDS.GetMyFriendsResponse,
			MYFRIENDS.GetMyFriendsRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/cff7fcd1011ad3bbe3e0e47484ce0051/myFriends',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});

export const { useGetMyFriendsQuery } = api;