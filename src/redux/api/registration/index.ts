import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postRegistration: build.mutation<
			REGISTRATION.PostRegistrationResponse,
			REGISTRATION.PostRegistrationRequest
		>({
			query: (data) => ({
				url: '/auth/signUp',
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['registration']
		})
	})
});
export const { usePostRegistrationMutation } = api;
