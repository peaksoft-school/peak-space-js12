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
		})
	})
});

export const {
	useGetUserPublicQuery,
	usePostUserPublicMutation,
	useGetPublicVideoQuery
} = api;
