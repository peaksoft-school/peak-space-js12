/* eslint-disable @typescript-eslint/no-unused-vars */

namespace COMENTSUSERS {
	type GetComentsUsersResponse = {
		id: number;
		userId: number;
		avatar: string;
		userName: string;
		comment: string;
		countLike: number;
		createdAt: string;
		like: boolean;
	}[];
	type PostComentsUsersResponse = {
		httpStatus: string;
		message: string;
		isBlock: boolean;
	};

	type PostComentsUsersRequest = { id: number; message: string };
	type GetComentsUsersRequest = number;
	type CommentPublicLikeResponse = {
		id: number;
	};

	type CommentPublicLikeRequest = {
		id: number;
	};
}
