/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STORY {
	type GetStoryResponse = {
		avatar: string;
		userId: number;
		// [x: string]: Key | null | undefined;
		// avatar: string;
		// _id(_id: any): unknown;
		userPhoto: string;
		userName: string;
		photosOrVideosLink: string[];
		text: string;
		createdAt: string;
	}[];
	type GetStoryRequest = void;
	type PostStoryResponse = {
		httpStatus: string;
		message: string;
	}[];
	type GetStoryMyRequest = void;
	type GetStoryMyResponse = {
		idStory: number;
		linkPublic: string;
		createdAt: string;
		text: null;
	}[];
	type PostStoryRequest = {
		photoUrlOrVideoUrl: string[];
		description: string;
		idsOfTaggedPeople: number[];
	};
	type DeleteStoryRequest = number;
	type DeleteStoryResponse = {
		_id: number;
	};
	type GetStoryByIdResponse = {
		id: Key | null | undefined;
		userPhoto: string;
		userName: string;
		createdAt: number;
		photosOrVideosLink: string;
	}[];
	type GetStoryByIdRequest = void;
}
