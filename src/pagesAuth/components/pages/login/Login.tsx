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
} from '@/src/redux/api/auth';
import { ToastContainer } from 'react-toastify';

interface LoginFormInputs {
	email: string;
	password: string;
}

const Login = () => {
	const [postGoogleToken] = usePostWithGoogleMutation();
	const [postRequest, { isLoading }] = usePostLoginMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const [rememberMe, setRememberMe] = useState<boolean>(false); // новое состояние для чекбокса
	const navigate = useNavigate();

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<LoginFormInputs>({ mode: 'onBlur' });

	const navigateToPages = () => {
		// window.location.reload();
		navigate('/');
	};

	const onSubmit = async (data: any) => {
		const response = (await postRequest(
			data
		)) as LOGIN.PostRegistrationResponse;
		if ('data' in response) {
			if (response.data) {
				const { token, id }: any = response.data;
				localStorage.setItem('auth_token', token);
				localStorage.setItem('isAuth', 'true');
				localStorage.setItem('userId', id);

				navigateToPages();
				reset();
			}
		}
		if (response.error) {
			console.log(response.error.data);
			if (response.error.status === 404) {
				messageApi.open({
					type: 'warning',
					content: response.error.data?.message
				});
			} else if (response.error.status === 417) {
				messageApi.open({
					type: 'warning',
					content: response.error.data?.message
				});
			}
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const idToken = await user.getIdToken();

			const data = {
				tokenFromGoogle: idToken
			};
			const response = await postGoogleToken(data);

			if ('data' in response) {
				const { token, idUser } = response.data;
				if (rememberMe) {
					localStorage.setItem('auth_token', JSON.stringify(token));
					localStorage.setItem('isAuth', 'true');
					localStorage.setItem('userId', idUser);
				} else {
					sessionStorage.setItem('auth_token', JSON.stringify(token));
					sessionStorage.setItem('isAuth', 'true');
				}
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
								name="email"
								control={control}
								defaultValue=""
								rules={{ required: 'Пожалуйста, введите ваш email.' }}
								render={({ field }) => (
									<Input
										{...field}
										placeholder="Номер телефона или email"
										type="email"
										className={scss.input_password}
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
							{errors.email && (
								<span className={scss.error_email}>{errors.email.message}</span>
							)}
							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{ required: 'Пароль обязателен к заполнению' }}
								render={({ field }) => (
									<Input.Password
										{...field}
										iconRender={(visible) =>
											visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
										}
										placeholder="Пароль"
										className={scss.input_password}
										visibilityToggle
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
									{errors.password.message}
								</span>
							)}

							<Checkbox
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
							>
								<p className={scss.text}>Сохранить вход</p>
							</Checkbox>
							<CustomButtonBold
								disabled={isLoading}
								children={isLoading ? 'Вход...' : 'Войти'}
								type="submit"
							/>
							<ToastContainer />
							<div onClick={handleGoogleLogin} className={scss.googleOut}>
								<GoogleImg className={scss.GoogleImg} onClick={() => {}} />
								<p>Войти через Google</p>
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
