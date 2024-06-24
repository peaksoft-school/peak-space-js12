// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace USEREDITPAGE {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type GetUserInfoResponse = {
		avatar: string;
		cover: string;
		userName: string;
		email: string;
		firstName: string;
		lastName: string;
		fathersName: string;
		aboutYourSelf: string;
		educationResponses: [
			{
				id: number;
				country: string;
				educationalInstitution: string;
			}
		];
		profession: string;
		workOrNot: null;
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type GetUserInfoRequest = void;
}
