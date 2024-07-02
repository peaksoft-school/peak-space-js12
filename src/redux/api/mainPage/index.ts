import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMainPage: build.query<MAIN.GetMainResponse, MAIN.GetMainRequest>({
			query: () => ({
				url: '/publics/my-friend-publications',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['main']
		}),
		putBlockUser: build.mutation<MAIN.BlockUserResponse, MAIN.BlockUserRequest>(
			{
				query: (id) => ({
					url: `/user-infos/block/${id}`,
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('auth_token')}`
					}
				}),
				invalidatesTags: ['main']
			}
		),
		putUnsubscribe: build.mutation<
			MAIN.BlockUserResponse,
			MAIN.BlockUserRequest
		>({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['main']
		}),
		postComplains: build.mutation<MAIN.BlockUserResponse, MAIN.ComplainRequest>(
			{
				query: (data) => ({
					url: `/complains/${data?.postId}?complain=${data?.complain}`,
					method: 'POST',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('auth_token')}`
					}
				}),
				invalidatesTags: ['main']
			}
		),
		addFavorite: build.mutation<
			MAIN.PostPublicFavoriteResponse,
			MAIN.PostPublicFavoriteRequest
		>({
			query: ({ id }) => ({
				url: `/posts/to-favorite/${id}`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['main']
		}),
		addLike: build.mutation<
			MAIN.PostPublicLikeResponse,
			MAIN.PostPublicLikeRequest
		>({
			query: ({ id }) => ({
				url: `/likes/to-post/${id}`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['main']
		}),
		deletePost: build.mutation<MAIN.DeletePostResponse, MAIN.DeletePostRequest>(
			{
				query: (id) => ({
					url: `/posts/${id}`,
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('auth_token')}`
					}
				}),
				invalidatesTags: ['main']
			}
		)
	})
});
export const {
	useGetMainPageQuery,
	usePutBlockUserMutation,
	usePutUnsubscribeMutation,
	usePostComplainsMutation,
	useAddFavoriteMutation,
	useAddLikeMutation,
	useDeletePostMutation
} = api;
