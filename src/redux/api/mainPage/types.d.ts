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
	}[];
	export interface LinkPublicationResponseList {
		id: number;
		link: string;
	}
	[];
	type GetMainRequest = void;
}
