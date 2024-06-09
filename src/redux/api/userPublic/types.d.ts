/* eslint-disable @typescript-eslint/no-unused-vars */
// user-public.d.ts
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
}
