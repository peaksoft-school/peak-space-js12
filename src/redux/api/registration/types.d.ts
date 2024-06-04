
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace REGISTRATION {
	type PostRegistrationResponse = {
		lastName: string;
		firstName: string;
		userName: string;
		email: string;
		password: string;
		data: string;
		userId:string
	};

	type PostRegistrationRequest = {
		lastName: string;
		firstName: string;
		userName: string;
		email: string;
		password: string;
	};
}
