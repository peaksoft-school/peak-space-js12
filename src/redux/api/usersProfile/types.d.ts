/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace usersProfile {
	type GetUserResponse = {
		id: number;
		img: string;
	}[];
	type GetUsersRequest = void;

	type GetFriendsResponse = {
		idUser: number;
		avatar: string;
		userName: string;
		aboutMe: string;
		isMyFriend: boolean;
		map: any;
	};

	type GetFriendsRequest = void;

	type GetChapterResponse = {
		map: any;
		length: any;

		groupName: string;
		id: number;
	};

	type GetChapterRequest = void;
}
