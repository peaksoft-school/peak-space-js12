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
		})
	})
});
export const { useGetUsersprofileQuery } = api;
