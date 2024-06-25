/* eslint-disable @typescript-eslint/no-unused-vars */
namespace FRIENDS {
	type GetFriendsRespose = {
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
}
