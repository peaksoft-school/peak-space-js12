import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getFriends: builder.query<
			FRIENDS.GetFriendsRespose,
			FRIENDS.GetFriendsRequest
		>({
      query: ()=> ({
        url: "https://74be1d548b99007d.mokky.dev/friends",
        method: 'GET'
      }),
      providesTags: ['friends']
    })
	})
});

 export const {useGetFriendsQuery } = api
