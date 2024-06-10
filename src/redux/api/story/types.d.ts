/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STORY {
	type GetStoryResponse = {
		_id: number;
		userPhoto: string;
		userName: string;
		photosOrVideosLink: [string];
		text: string;
		createdAt: number;
	}[];
	type GetStoryRequest = void;

	type GetUsersResponse = {
		id: number;
		avatar: string;
		userName: string;
		firstName: string;
		lastName: string;
		profession: string;
		cover: string;
	}[];

	type GetUsersRequest = {
		keyWord: string;
	};
}
