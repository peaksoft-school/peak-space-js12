import { useState } from 'react';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import peakSpace from '../../../../assets/peakSpace.png';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
	const [_, contextHolder] = message.useMessage();
	const [rememberMe, setRememberMe] = useState<boolean>(false); // новое состояние для чекбокса

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<LoginFormInputs>({ mode: 'onBlur' });

	const navigateToPages = () => {
		window.location.reload();
	};

	const handleLogin = async (data: LoginFormInputs) => {
		try {
			const result = await postRequest(data);
			if ('data' in result) {
				const { token } = result.data!;
				if (rememberMe) {
					localStorage.setItem('auth_token', JSON.stringify(token));
					localStorage.setItem('isAuth', 'true');
				} else {
					sessionStorage.setItem('auth_token', JSON.stringify(token));
					sessionStorage.setItem('isAuth', 'true');
				}
				navigateToPages();
				reset();
			}
		} catch (error) {
			console.error('Ошибка входа:', error);
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
				const { token } = response.data;
				if (rememberMe) {
					localStorage.setItem('auth_token', JSON.stringify(token));
					localStorage.setItem('isAuth', 'true');
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
						<form onSubmit={handleSubmit(handleLogin)} className={scss.form}>
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
