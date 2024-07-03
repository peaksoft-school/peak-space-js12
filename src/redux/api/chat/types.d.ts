namespace CHAT {
	type GetResponse = {
		id?: number;
		avatar: string;
		firstName: string;
		lastName: string;
		userName: string;
		email: string;
	}[];
	type GetRequest = void;
}
