import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (build) => ({
		getStory: build.query<STORY.GetStoryResponse, STORY.GetStoryRequest>({
			query: () => ({
				url: '/stories/all',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['story']
		}),
		getStoryById: build.query<
			STORY.GetStoryByIdResponse,
			STORY.GetStoryByIdRequest
		>({
			query: (id) => ({
				url: `/stories?userId/${id}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['story']
		}),
		getStoryMy: build.query<
			STORY.GetStoryMyResponse,
			STORY.GetStoryByIdRequest
		>({
			query: (id) => ({
				url: `/stories/my-stories`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['story']
		}),
		postStory: build.mutation<STORY.PostStoryResponse, STORY.PostStoryRequest>({
			query: (newData) => ({
				url: '/stories',
				method: 'POST',
				body: newData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['story']
		}),
		deleteStory: build.mutation<
			STORY.DeleteStoryResponse,
			STORY.DeleteStoryRequest
		>({
			query: (id) => ({
				url: `/stories/${id}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			invalidatesTags: ['story']
		})
	})
});

export const {
	useGetStoryQuery,
	useGetStoryByIdQuery,
	useGetStoryMyQuery,
	usePostStoryMutation,
	useDeleteStoryMutation
} = api;
