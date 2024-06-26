/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import peakSpace from '../../../../assets/peakSpace.png';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Checkbox, message } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import { GoogleImg } from '@/src/assets/icons';
import line from '../../../../assets/line.svg';
import { auth, provider } from './firebase';
import scss from './Login.module.scss';
import {
	usePostLoginMutation,
	usePostWithGoogleMutation
} from '@/src/redux/api/login';
import { ToastContainer } from 'react-toastify';

interface ErrorObject {
	password: string;
	email: string;
}

const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [postGoogleToken] = usePostWithGoogleMutation();
	const [postRequest, { isLoading }] = usePostLoginMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ErrorObject>({ mode: 'onBlur' });

	const navigateToPages = () => {
		navigate('/', { replace: true });
	};

	// const onSubmit = async (data: any) => {
	// 	try {
	// 		const response = await postRequest(data);
	// 		console.log('Full Response:', response);

	// 		if (response.data?.httpStatus === 'OK') {
	// 			const responseData = response.data;
	// 			console.log('Response Data:', responseData);

	// 			const status = responseData?.httpStatus;
	// 			const token = responseData?.token;

	// 			if (status === 'OK') {
	// 				localStorage.setItem('auth_token', token);
	// 				localStorage.setItem('isAuth', 'true');
	// 				navigateToPages();
	// 				reset();
	// 			} else {
	// 				messageApi.open({
	// 					type: 'warning',
	// 					content: 'Произошла ошибка на сервере.'
	// 				});
	// 			}
	// 		} else {
	// 			console.error('Ошибка HTTP:', response.status);
	// 			messageApi.open({
	// 				type: 'error',
	// 				content: 'Произошла ошибка при выполнении запроса, попробуйте снова.'
	// 			});
	// 		}
	// 	} catch (error: any) {
	// 		console.error('Ошибка входа:', error);

	// 		if (error.response && error.response.status === 404) {
	// 			const errorMessage =
	// 				error.response.data?.message || 'Пользователь не найден.';
	// 			alert(errorMessage);
	// 		} else {
	// 			messageApi.open({
	// 				type: 'error',
	// 				content: 'Произошла ошибка при входе, попробуйте снова.'
	// 			});
	// 		}
	// 	}
	// };

	const onSubmit = async (data: any) => {

		try {
			const result = await postRequest(data);
			if ('data' in result) {
				const { token }: any = result.data;
				localStorage.setItem('auth_token', token);
				localStorage.setItem('isAuth', 'true');
				navigateToPages();
				reset();
			}
		} catch (error) {
			console.error('Ошибка входа:', error);
		}
	};

	const handleWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const idToken = await user.getIdToken();

			const data = {
				tokenFromGoogle: idToken
			};
			const response = await postGoogleToken(data);

			if ('data' in response) {
				const { token }: any = response.data;
				localStorage.setItem('auth_token', token);
				localStorage.setItem('isAuth', 'true');
				navigateToPages();
				reset();
			}
		} catch (error) {
			console.error('Error during sign-in:', error);
			return null;
		}
	};

	return (
		<div className={scss.Login}>
			<div className={scss.section}>
				<div className="container">
					<div className={scss.aside}>
						<img src={peakSpace} alt="peakSpace" />
						<form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
							{contextHolder}
							<Controller
								{...register('email')}
								control={control}
								defaultValue=""
								rules={{ required: 'Пожалуйста, введите ваш email.' }}
								render={({ field }) => (
									<Input
										className={scss.input_password}
										{...field}
										placeholder="Номер телефона или email"
										type="email"
										style={{
											borderColor: errors.email ? 'red' : '',
											backgroundColor: errors.email
												? 'rgba(255, 0, 0, 0.122)'
												: '',
											outline: 'none'
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '';
											e.target.style.backgroundColor = '';
										}}
									/>
								)}
							/>
							{errors?.email && (
								<span className={scss.error_email}>{errors.email.message}</span>
							)}
							<Controller
								{...register('password')}
								control={control}
								defaultValue=""
								rules={{ required: 'Пароль обязателен к заполнению' }}
								render={({ field }) => (
									<Input.Password
										{...field}
										iconRender={(visible) =>
											visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
										}
										placeholder=" Пароль"
										className={scss.input_password}
										visibilityToggle
										type={showPassword ? 'text' : 'password'}
										style={{
											borderColor: errors.password ? 'red' : '',
											backgroundColor: errors.password
												? 'rgba(255, 0, 0, 0.122)'
												: '',
											outline: 'none'
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '';
											e.target.style.backgroundColor = '';
										}}
									/>
								)}
							/>
							{errors.password && (
								<span className={scss.error_password}>
									{errors?.password?.message || 'error!'}
								</span>
							)}

							<Checkbox
								checked={showPassword}
								onChange={togglePasswordVisibility}
							>
								<p className={scss.text}>Сохранить вход</p>
							</Checkbox>
							<CustomButtonBold
								disabled={isLoading}
								children={isLoading ? 'Вход...' : 'Войти'}
								type="submit"
							/>
							<ToastContainer />
							<div onClick={handleWithGoogle} className={scss.googleOut}>
								<GoogleImg
									className={scss.GoogleImg}
									onClick={function (): void {
										throw new Error('Function not implemented.');
									}}
								/>
								<p> Войти через Google</p>
							</div>
							<Link className={scss.link} to="/auth/forgetPassword">
								Забыли пароль
							</Link>
							<div className={scss.lines}>
								<img src={line} alt="line" />
								<p style={{ color: 'gray' }}>или</p>
								<img src={line} alt="line" />
							</div>
						</form>
						<Link to="/auth/registration">Зарегистрироваться</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
