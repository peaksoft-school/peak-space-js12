import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getComentUsers: builder.query<
			COMENTSUSERS.GetComentsUsersResponse,
			COMENTSUSERS.GetComentsUsersRequest
		>({
			query: () => ({
				url: 'https://e37485282aedd244.mokky.dev/comments',
				method: 'GET'
			}),
			providesTags: ['comentsUsers']
		})
	})
});

export const { useGetComentUsersQuery } = api;
