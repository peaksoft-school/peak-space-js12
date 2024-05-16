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
					url: '/api/signIn',
					method: 'POST',
					body: data
				}
			),
			invalidatesTags: ['login']
		})
	})
});

export const { usePostLoginMutation } = api;
