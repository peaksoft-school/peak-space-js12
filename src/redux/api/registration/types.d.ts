/* eslint-disable @typescript-eslint/no-unused-vars */
namespace REGISTRATION {
	type PostRegistrationResponse = {
		data?: {
			lastName: string;
			firstName: string;
			userName: string;
			email: string;
			password: string;
			data: string;
			userId: string;
			httpStatus: string;
		};
		status: number;
		error?: {
			data?: {
				message: string;
			};
			status: number;
		};
	};

	type PostRegistrationRequest = {
		lastName: string;
		firstName: string;
		userName: string;
		email: string;
		password: string;
	};
}
