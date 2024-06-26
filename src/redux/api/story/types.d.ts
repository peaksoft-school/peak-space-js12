/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STORY {
	type GetStoryResponse = {
		userId: number;
		avatar: string;
		username: string;
		photosOrVideosLink: [string];
		text: string;
		createdAt: number;
	}[];
	type GetStoryRequest = void;

	type PostStoryRequest = {
		photoUrlOrVideoUrl: string[];
		description: string;
		idsOfTaggedPeople: number[];
	};
	type PostStoryResponse = {
		httpStatus: string;
		message: string;
	}[];
	type GetUsersResponse = {
		id: number;
		avatar: string;
		userName: string;
		firstName: string;
		lastName: string;
		profession: string;
		cover: string;
	}[];
	type DeleteStoryRequest = number;
	type DeleteStoryResponse = {
		_id: number;
	};
	type GetStoryMyRequest = void;
	type GetStoryMyResponse = {
		idStory: number;
		linkPublic: string;
		createdAt: string;
		text: null;
	}[];

	type GetUsersRequest = {
		keyWord: string;
	};
	type GetStoryByIdResponse = {
		text: ReactNode;
		id: Key | null | undefined;
		userPhoto: string;
		userName: string;
		createdAt: number;
		photosOrVideosLink: string;
	}[];
	type GetStoryByIdRequest = number | undefined;
}
