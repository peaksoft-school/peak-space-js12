import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		putPassword: build.mutation({
			query: (newData) => ({
				url: `/auth/forgotPassword?email=${encodeURIComponent(newData.email)}&link=${encodeURIComponent(newData.link)}`,
				method: 'PUT'
			}),
			invalidatesTags: ['login']
		}),
		createPassword: build.mutation({
			query: (newItem) => ({
				url: `/auth/createPassword?password=${encodeURIComponent(newItem.password)}&confirm=${encodeURIComponent(newItem.confirm)}&uuid=${encodeURIComponent(newItem.uuid)}`,
				method: 'POST',
				body: newItem
			}),
			invalidatesTags: ['login']
		})
	})
});

export const { usePutPasswordMutation, useCreatePasswordMutation } = api;
