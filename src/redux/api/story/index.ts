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
				url: `/stories?userId=${id}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['story']
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
		}),
		getStoryMy: build.query<STORY.GetStoryMyResponse, STORY.GetStoryMyRequest>({
			query: () => ({
				url: `/stories/my-stories`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['story']
		}),
		users: build.query<STORY.GetUsersResponse, STORY.GetUsersRequest>({
			query: ({ keyWord }) => ({
				url: `/users/search-with-all?${keyWord}`,
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('auth_token')}`
				}
			}),
			providesTags: ['post']
		})
	})
});

export const {
	useDeleteStoryMutation,
	useGetStoryMyQuery,
	useGetStoryQuery,
	useGetStoryByIdQuery,
	useUsersQuery
} = api;
