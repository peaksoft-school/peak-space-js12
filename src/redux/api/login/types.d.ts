/* eslint-disable @typescript-eslint/no-unused-vars */
namespace LOGIN {
	type PostRegistrationResponse = {
		data?: {
			email: string;
			password: string;
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
		email: string;
		password: string;
	};
}
