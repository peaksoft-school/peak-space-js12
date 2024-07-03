/* eslint-disable @typescript-eslint/no-unused-vars */
namespace BLOCKEDUSERS {
	type GetBlockedUsersResponse = {
		id: number;
		userName: string;
		avatar: string;
		cover: string;
		aboutYourSelf: string;
		firstName: string;
		lastName: string;
	}[];

	type GetBlockedUsersRequest = void;
}
