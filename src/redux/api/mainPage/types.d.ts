/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MAIN {
	type GetMainResponse = {
		id: number;
		avatar: string;
		username: string;
		location: string;
		postId: number;
		description: string;
		linkPublicationResponseList: LinkPublicationResponseList[];
		countLikes: number;
		countComments: number;
		link: string;
		like: boolean;
		fromMyBlockAccount: boolean;
		favorite: boolean;
	}[];
	export interface LinkPublicationResponseList {
		id: number;
		link: string;
	}
	[];
	type GetMainRequest = void;

	type BlockUserResponse = {
		httpStatus: string;
		message: string;
		isBlock: boolean;
	};
	type BlockUserRequest = number | undefined;

	type ComplainRequest = {
		postId: number;
		complain: string;
	};

	type PostPublicFavoriteResponse = {
		id: number;
	};

	type PostPublicFavoriteRequest = {
		id: number;
	};

	type PostPublicLikeResponse = {
		id: number;
	};

	type PostPublicLikeRequest = {
		id: number;
	};

	type DeletePostRequest = number;
	type DeletePostResponse = {
		_id: number;
	};
}
