/* eslint-disable @typescript-eslint/no-unused-vars */
namespace FRIENDS {
	type GetFriendsResponse = {
		id: number;
		avatar: string;
		cover: string;
		userName: string;
		aboutYourSelf: string;
		profession: string;
		friendsSize: number;
		publicationsSize: number;
	}[];

	type GetFriendsRequest = void;

	type GetPhotoFriendResponse = {
		id: number;
		linkPublications: string[];
	};


	type GetPhotoFriendRequest = void
}
