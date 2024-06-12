import { api as index } from '..';
import { USERPUBLIC } from './types';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getUserPublic: build.query<
			USERPUBLIC.GetUserPublicResponse,
			USERPUBLIC.GetUserPublicRequest
		>({
			query: () => ({
				url: 'https://63476dac7ee4143e.mokky.dev/public',
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
			query: (publicId) => ({
				url: `/public-profiles/${publicId}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		}),
		editPublic: build.mutation({
			query: (newData ) => ({
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
		})
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
	useEditPublicMutation
} = api;
