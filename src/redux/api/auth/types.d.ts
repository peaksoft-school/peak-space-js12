namespace AUTH {
	type GetMeResponse = User;
	type GetMeRequest = void;

	type PostLoginResponse = {
		id: number;
		token: string;
	};
	type PostLoginRequest = {
		email: string;
		password: string;
	};

	type PostRegistrationResponse = {
		userId: number;
		message: string;
	};
	type PostRegistrationRequest = {
		lastName: string;
		firstName: string;
		userName: string;
		email: string;
		password: string;
	};

	type PostConformEmailResponse = {
		id: number;
		token: string;
	};
	type PostConformEmailRequest = {
		codeInEmail: number;
		id: number;
	};
}
