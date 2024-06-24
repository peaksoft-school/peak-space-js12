import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postLogin: build.mutation<
			LOGIN.PostRegistrationResponse,
			LOGIN.PostRegistrationRequest
		>({
			query: (data) => ({
				url: '/auth/signIn',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['login']
		}),
		postWithGoogle: build.mutation({
			query: (data) => ({
				url: `/auth-with-google/verify-token?tokenFromGoogle=${encodeURIComponent(data.tokenFromGoogle)}`,
				method: 'POST'
			}),
			invalidatesTags: ['login']
		}),
		confirmByEmail: build.mutation({
			query: (newData) => ({
				url: `/auth/confirmCodeByEmail?codeInEmail=${encodeURIComponent(newData.codeInEmail)}&id=${encodeURIComponent(newData.id)}`,
				method: 'POST',
				body: newData
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
