/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MAIN {
	type GetMainResponse = {
		_id: number;
		avatar: string;
		nicname: string;
		localtion: string;
		text: string;
		postImg: string;
		secondPost: string;
	}[];
	type GetMainRequest = void;
}
