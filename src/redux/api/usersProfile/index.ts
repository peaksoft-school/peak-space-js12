import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getUsersprofile: build.query<
			usersProfile.GetUserResponse,
			usersProfile.GetUsersRequest
		>({
			query: () => ({
				url: 'https://33707de987c7c248.mokky.dev/newPhoto',
				method: 'Get'
			}),
			providesTags: ['userProfile']
		}),
		userFriends: build.query<
			usersProfile.GetFriendsResponse,
			usersProfile.GetFriendsRequest
		>({
			query: (userId) => ({
				url: `/chapters/all-my-friends/${userId} `,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		addChapters: build.query<
			usersProfile.GetChapterResponse,
			usersProfile.GetChapterRequest
		>({
			query: (userId) => ({
				url: `/chapters/user-chapters/${userId}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		}),
		postChapter: build.mutation({
			query: (newData) => ({
				url: '/chapters',
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['post']
		})
	})
});
export const {
	useGetUsersprofileQuery,
	useUserFriendsQuery,
	useAddChaptersQuery,
	usePostChapterMutation
} = api;
