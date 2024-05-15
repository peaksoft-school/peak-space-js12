import { api as index } from '..';

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
		})
	})
});

export const { useGetUserPublicQuery, usePostUserPublicMutation, useGetPublicVideoQuery } = api;