/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MYFRIENDS {
	type GetMyFriendsResponse = {
		_id: Key | null | undefined;
		name: string;
		description: string;
		ProfilePicture: string;
	}[];
	type GetMyFriendsRequest = void;
}
