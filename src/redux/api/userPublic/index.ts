import { api as index } from '..';
import { USERPUBLIC } from './types';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getUserPublic: build.query<
			USERPUBLIC.GetUserPublicResponse,
			USERPUBLIC.GetUserPublicRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/4cef53d5dea17a51c65ab1510ec00c15/userPulic',
				method: 'GET'
			}),
			providesTags: ['post']
		}),

		postUserPublic: build.mutation<
			USERPUBLIC.PostUserPublicResponse,
			USERPUBLIC.PostUserPublicRequest
		>({
			query: (newData) => ({
				url: 'https://63476dac7ee4143e.mokky.dev/public',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['post']
		}),

		getPublicVideo: build.query<
			USERPUBLIC.GetPublicVideoResponse,
			USERPUBLIC.GetPublicVideoRequest
		>({
			query: () => ({
				url: 'https://63476dac7ee4143e.mokky.dev/publicVideo',
				method: 'GET'
			}),
			providesTags: ['post']
		}),
		createPublic: build.mutation<
			USERPUBLIC.CreatePublicResponse,
			USERPUBLIC.CreatePublicRequest
		>({
			query: (newData) => ({
				url: '/public-profiles',
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		publicWithId: build.query<USERPUBLIC.GetResponse, USERPUBLIC.GetRequest>({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			query: ({ publicId, userId }: any) => ({
				url: `/public-profiles/my-public/${publicId}/${userId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		getTest: build.query<USERPUBLIC.GetResponse, USERPUBLIC.GetRequest>({
			query: (publicName) => ({
				url: `/public-profiles/public/${publicName}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		userPublicmyCommunity: build.query<
			USERPUBLIC.GetResponse,
			USERPUBLIC.GetRequest
		>({
			query: () => ({
				url: '/public-profiles/myCommunity',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		recommendationGet: build.query<
			USERPUBLIC.GetResponse,
			USERPUBLIC.GetRequest
		>({
			query: () => ({
				url: '/public-profiles',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		getYuofollow: build.query<USERPUBLIC.GetResponse, USERPUBLIC.GetRequest>({
			query: () => ({
				url: '/public-profiles/myCommunities',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		deleteId: build.mutation({
			query: () => ({
				url: `/public-profiles`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		editPublic: build.mutation({
			query: (newData) => ({
				url: `/public-profiles`,
				method: 'PATCH',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),

		getId: build.query<USERPUBLIC.GetResponse, USERPUBLIC.GetRequest>({
			query: (communityId) => ({
				url: `/public-profiles/${communityId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		postPublicById: build.mutation<
			USERPUBLIC.PostPublicByIdResponse,
			USERPUBLIC.PostPublicByIdRequest
		>({
			query: ({ communityId, newData }) => ({
				url: `/public-profiles/${communityId}`,
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		getPublicPhotos: build.query<
			USERPUBLIC.GetPublicPhotoResponse,
			USERPUBLIC.GetPublicPhotoRequest
		>({
			query: (communityId) => ({
				url: `/public-profiles/publications/${communityId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		deletePhotoById: build.mutation({
			query: (postId) => ({
				url: `/public-posts/${postId}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		joinPublicById: build.mutation({
			query: (publicId) => ({
				url: `/public-profiles/send-join-public/${publicId}`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),

		removeUserInPublic: build.mutation({
			query: (friendId) => ({
				url: `/public-profiles/tag/${friendId}`,
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		modalComment: build.query<
			USERPUBLIC.GetModalCommentResponse,
			USERPUBLIC.GetModalCommentRequest
		>({
			query: (postId) => ({
				url: `/posts/find/${postId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),

		likeComment: build.mutation({
			query: (commentId) => ({
				url: `/likes/to-comment/${commentId}`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		likePost: build.mutation({
			query: (postId) => ({
				url: `/likes/to-post/${postId}`,
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		commentPost: build.mutation({
			query: ({ commentId, newData }) => ({
				url: `/inner-comments/${commentId}`,
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		innerCommentByid: build.query<
			USERPUBLIC.GetCommentResponse,
			USERPUBLIC.GetCommentRequest
		>({
			query: (commentId) => ({
				url: `/inner-comments/${commentId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		innerCommentDelete: build.mutation({
			query: (commentId) => ({
				url: `/inner-comments/${commentId}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		editComment: build.mutation({
			query: ({ commentId, newData }) => ({
				url: `/comments/${commentId}`,
				method: 'PUT',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),

		addedComment: build.mutation({
			query: ({ postId, newData }) => ({
				url: `/comments/${postId}`,
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		commentResponse: build.query<
			USERPUBLIC.GetCommentResponse,
			USERPUBLIC.GetCommentRequest
		>({
			query: (postId) => ({
				url: `/comments/${postId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),

	})
});

export const {
	useGetUserPublicQuery,
	usePostUserPublicMutation,
	useGetPublicVideoQuery,
	useCreatePublicMutation,
	usePublicWithIdQuery,
	useGetTestQuery,
	useUserPublicmyCommunityQuery,
	useRecommendationGetQuery,
	useGetYuofollowQuery,
	useDeleteIdMutation,
	useGetIdQuery,
	useEditPublicMutation,
	usePostPublicByIdMutation,
	useGetPublicPhotosQuery,
	useDeletePhotoByIdMutation,
	useJoinPublicByIdMutation,
	useRemoveUserInPublicMutation,
	useModalCommentQuery,
	useCommentPostMutation,
	useInnerCommentDeleteMutation,
	useEditCommentMutation,
	useLikeCommentMutation,
	useAddedCommentMutation,
	useInnerCommentByidQuery,
	useCommentResponseQuery
} = api;
