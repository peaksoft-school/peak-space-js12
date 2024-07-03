import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
			query: () => ({
				url: '/user-infos',
				method: 'GET'
			}),
			providesTags: ['auth']
		}),
		postLogin: build.mutation<AUTH.PostLoginResponse, AUTH.PostLoginRequest>({
			query: (data) => ({
				url: '/auth/signIn',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['auth']
		}),
		postRegistration: build.mutation<
			AUTH.PostRegistrationResponse,
			AUTH.PostRegistrationRequest
		>({
			query: (data) => ({
				url: '/auth/signUp',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['registration']
		}),
		putPassword: build.mutation({
			query: (newData) => ({
				url: `/auth/forgotPassword?email=${encodeURIComponent(newData.email)}&link=${encodeURIComponent(newData.link)}`,
				method: 'PUT'
			}),
			invalidatesTags: ['auth']
		}),
		createPassword: build.mutation({
			query: (newItem) => ({
				url: `/auth/createPassword?password=${encodeURIComponent(newItem.password)}&confirm=${encodeURIComponent(newItem.confirm)}&uuid=${encodeURIComponent(newItem.uuid)}`,
				method: 'POST',
				body: newItem
			}),
			invalidatesTags: ['auth']
		}),
		postWithGoogle: build.mutation({
			query: (data) => ({
				url: `/auth-with-google/verify-token?tokenFromGoogle=${encodeURIComponent(data.tokenFromGoogle)}`,
				method: 'POST'
			}),
			invalidatesTags: ['auth']
		}),
		confirmByEmail: build.mutation<
			AUTH.PostConformEmailResponse,
			AUTH.PostConformEmailRequest
		>({
			query: (newData) => ({
				url: `/auth/confirmCodeByEmail?codeInEmail=${encodeURIComponent(newData.codeInEmail)}&id=${encodeURIComponent(newData.id)}`,
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['auth']
		})
	})
});

export const {
		useGetMeQuery,
	usePostLoginMutation,
	usePostRegistrationMutation,
	usePutPasswordMutation,
	useCreatePasswordMutation,
	usePostWithGoogleMutation,
	useConfirmByEmailMutation
} = api;
