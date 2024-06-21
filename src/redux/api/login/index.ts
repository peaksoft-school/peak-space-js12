import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postLogin: build.mutation<
			LOGIN.PostRegistrationResponse,
			LOGIN.PostRegistrationRequest
		>({
			query: (data) => (
				console.log(data),
				{
					url: '/auth/signIn',
					method: 'POST',
					body: data
				}
			),
			invalidatesTags: ['login']
		}),
		postWithGoogle: build.mutation({
			query: (data) => ({
				url: `/auth-with-google/verify-token?tokenFromGoogle=${encodeURIComponent(data.tokenFromGoogle)}`,
				method: 'POST'
				// headers: {
				// 	Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				// }
			}),
			invalidatesTags: ['login']
		}),
		confirmByEmail: build.mutation({
			query: (newData) => ({
				url: `/auth/confirmCodeByEmail?codeInEmail=${encodeURIComponent(newData.codeInEmail)}&id=${encodeURIComponent(newData.id)}`,
				method: 'POST',
				body: newData
				// headers: {
				// 	Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				// }
			}),
			invalidatesTags: ['login']
		})
	})
});

export const {
	usePostLoginMutation,
	usePostWithGoogleMutation,
	useConfirmByEmailMutation
} = api;
