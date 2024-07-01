import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getNotification: builder.query<
			NOTIFICATIONS.GetNotificationResponse,
			NOTIFICATIONS.GetNotificationRequest
		>({
			query: () => ({
				url: '/notifications',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetNotificationQuery } = api;
