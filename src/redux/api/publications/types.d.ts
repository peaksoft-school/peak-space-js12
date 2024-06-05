/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PROFIL {
	type GetProfilResponse = {
		id: number;
		img: string;
	}[];
	type GetProfilRequest = void;

	type GetVideoResponse = {
		id: number;
		link: string;
	}[];
	type GetVideoRequest = void;

	type GetMyPublicationResponse = {
		cover: string;
		avatar: string;
		userName: string;
		aboutMe: string;
		major: string;
		countFriends: number;
		countPablics: number;
		publications: Publications;
	};

	interface Root {}

	type CommentResponse = {
		id: number;
		userId: number;
		avatar: string;
		userName: string;
		comment: string;
		countLike: number;
		createdAt: string;

		postId: number;
		userId: number;
		avatar: string;
		userName: string;
		location: string;
		description: string;
		countLikes: number;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		links: any[];
		commentResponses: CommentResponse[];
	};

	type CommentRequest = void;

	type GetMyPublicationRequest = void;

	type PostProfilResponse = {
		data: never;
		url(url: PostProfilResponse): unknown;
		url: PostProfilResponse;
		status: number;
		id: number;
		img: string;
	};
	type PostProfilRequest = {
		id: number;
		img: string;
	};
}
