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
}
