/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace USERPUBLIC {
	type GetUserPublicResponse = {
		_id: number;
		img: string;
	}[];

	type GetUserPublicRequest = void;

	type PostUserPublicResponse = {
		id: number;
		img: string;
	};

	type PostUserPublicRequest = {
		id: number;
		img: string;
	};

	type GetPublicVideoResponse = {
		id: number;
		img: string;
	}[];

	type GetPublicVideoRequest = void;

	type CreatePublicResponse = {
		cover: string;
		avatar: string;
		pablicName: string;
		descriptionPublic: string;
		tematica: string;
	};

	type CreatePublicRequest = {
		cover: string;
		avatar: string;
		pablicName: string;
		descriptionPublic: string;
		tematica: string;
	};

	type GetResponse = {
		id: Key | null | undefined;
		publicId: number;
		cover: string;
		avatar: string;
		pablicName: string;
		userName: string;
		descriptionPublic: string;
		tematica: string;
		countFollower: number;
	}[];

	type GetRequest = void;

	type PostPublicByIdResponse = {
		links: string[];
		description: string;
		location: string;
		blockComment: boolean;
	};

	type PostPublicByIdRequest = {
		links: string[];
		description: string;
		location: string;
		blockComment: boolean;
		communityId: string;
		newData: string;
	};

	type GetPublicPhotoResponse = {
		ownerId: number;
		id: number;
		link: string;
	}[];

	type GetPublicPhotoRequest = void;

	type GetModalCommentResponse = {
		id: number;
		userId: number;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		avatar: any;
		userName: string;
		location: string;
		description: string;
		countLikes: number;
		links: Link[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		commentResponses: any[];
		blockComment: boolean;
	};

	type GetModalCommentRequest = void;

	type GetCommentResponse = {
		innerCommentId: number;
		userId: number;
		avatar: string;
		userName: string;
		comment: string;
		countLike: number;
		createdAt: string;
	};

	type GetCommentRequest = void
}
