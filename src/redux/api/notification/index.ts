import { api as index } from '..';
const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getNotification: builder.query<
			NOTIFICATIONS.GetNotificationResponse,
			NOTIFICATIONS.GetNotificationRequest
		>({
			query: () => ({
				url: '/https://07cf8c38cd79d90d.mokky.dev/mokkey',
				// url: 'https://6155bff3810f5771.mokky.dev/items',
				method: 'GET'
			}),
			providesTags: ['api']
		})
	})
});
export const { useGetNotificationQuery } = api;
