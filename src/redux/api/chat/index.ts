import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getChatUser: build.query<CHAT.GetResponse, CHAT.GetRequest>({
			query: () => ({
				url: '/users',
				method: 'GET'
			}),
			providesTags: ['chat']
		})
	})
});
export const { useGetChatUserQuery } = api;
