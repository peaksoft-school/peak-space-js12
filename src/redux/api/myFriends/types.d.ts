/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace MYFRIENDS {
	type GetMyFriendsResponse = {
		_id: Key | null | undefined;
		name: string;
		description: string;
		ProfilePicture: string;
	}[];
	type GetMyFriendsRequest = void;
}
