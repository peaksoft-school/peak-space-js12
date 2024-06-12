import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (build) => ({
		postRegistration: build.mutation<
			REGISTRATION.PostRegistrationResponse,
			REGISTRATION.PostRegistrationRequest
		>({
			query: (data) => (
				console.log(data),
				{
					url: '/auth/signUp',
					method: 'POST',
					body: data,
					headers: {
						Authorization: `Bearer ${localStorage.getItem('auth_token')}`
					}
				}
			),
			invalidatesTags: ['registration']
		})
	})
});
export const { usePostRegistrationMutation } = api;
