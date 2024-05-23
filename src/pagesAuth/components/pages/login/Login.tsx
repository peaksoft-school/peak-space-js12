/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './Login.module.scss';
import peakSpace from '../../../../assets/peakSpace.png';
import { useState } from 'react';
import { Input, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { GoogleImg } from '@/src/assets/icons';
import { Link, useNavigate } from 'react-router-dom';
import line from '../../../../assets/line.svg';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import { Controller, useForm } from 'react-hook-form';
import {
	usePostLoginMutation,
	usePostWithGoogleMutation
} from '@/src/redux/api/login';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

interface ErrorObject {
	password: string;
	email: string;
}

const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [postGoogleToken] = usePostWithGoogleMutation();
	const [postRequest] = usePostLoginMutation();
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
		navigate('/');
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = async (data: any) => {
		console.log(data, 'data');
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
			console.log(idToken);

			const data = {
				tokenFromGoogle: idToken
			};
			await postGoogleToken(data);
			navigateToPages();
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
						<img src={peakSpace} alt="#" />
						<form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
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
							<CustomButtonBold children="Войти" type="submit" />
							<div onClick={handleWithGoogle} className={scss.googleOut}>
								<GoogleImg
									className={scss.GoogleImg}
									onClick={() => togglePasswordVisibility}
								/>
								<p> Войти через Google</p>
							</div>
							<Link className={scss.link} to="/auth/forgetPassword">
								Забыли пароль
							</Link>
							<div className={scss.lines}>
								<img src={line} alt="#" /> <p style={{ color: 'gray' }}>или</p>
								<img src={line} alt="#" />
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
