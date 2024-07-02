import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getComentUsers: build.query<
			COMENTSUSERS.GetComentsUsersResponse,
			COMENTSUSERS.GetComentsUsersRequest
		>({
			query: (id: number) => ({
				url: `/comments/${id}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['comentsUsers']
		}),
		postComentUsers: build.mutation<
			COMENTSUSERS.PostComentsUsersResponse,
			COMENTSUSERS.PostComentsUsersRequest
		>({
			query: ({ id, message }) => ({
				url: `/comments/${id}`,
				method: 'POST',
				body: { message },
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['comentsUsers']
		}),
		addLikeComment: build.mutation<
			COMENTSUSERS.CommentPublicLikeResponse,
			COMENTSUSERS.CommentPublicLikeRequest
		>({
			query: ({ id }) => ({
				url: `/likes/to-comment/${id}`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['comentsUsers']
		})
	})
});

export const {
	useGetComentUsersQuery,
	usePostComentUsersMutation,
	useAddLikeCommentMutation
} = api;
