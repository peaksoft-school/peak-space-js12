/* eslint-disable @typescript-eslint/no-unused-vars */
namespace LOGIN {
	type PostRegistrationResponse = {

		data? :{
			email: string;
			password: string;
			httpStatus: string;

		}
	};

	type PostRegistrationRequest = {
		email: string;
		password: string;
	};
}
