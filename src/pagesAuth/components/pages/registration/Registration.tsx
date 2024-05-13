import { Input, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';

import CustomButtonBold from '@/src/ul/customButton/CustomButtonBold';
import peakSpaceImg from '../../../../assets/peakSpace.png';
import scss from './Registration.module.scss';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

interface ErrorObject {
	message: string;
	password: string;
	email: string;
	Фамилия: string;
	Имя: string;
	nameUser: string;
}

const Registration = () => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ErrorObject>({ mode: 'onBlur' });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (data: any) => {
		if (password !== confirmPassword) {
			alert('Пароли не совпадают');
			return null;
		}

		console.log(data);

		setConfirmPassword('');
		reset();
	};

	return (
		<div className={scss.back_header}>
			<div className={scss.Registration}>
				<div className="container">
					<form onSubmit={handleSubmit(onSubmit)} className={scss.bar}>
						<img src={peakSpaceImg} alt="Peak Space" />
						<div className={scss.inputs}>
							<Controller
								name="Фамилия"
								control={control}
								defaultValue=""
								rules={{ required: 'Это поле обязательно к заполнению' }}
								render={({ field }) => (
									<Input
										className={scss.input_password}
										{...field}
										placeholder="Введите логин"
										type="text"
										style={{
											borderColor: errors.Фамилия ? 'red' : '',
											backgroundColor: errors.Фамилия
												? 'rgba(255, 0, 0, 0.122)'
												: ''
										}}
										onFocus={(e) => {
											e.target.style.borderColor = '';
											e.target.style.backgroundColor = '';
										}}
									/>
								)}
							/>
							{errors?.Фамилия && (
								<p className={scss.text_error}>{errors.Фамилия.message}</p>
							)}
							<Controller
								name="Имя"
								control={control}
								defaultValue=""
								rules={{ required: 'Это поле обязательно к заполнению' }}
								render={({ field }) => (
									<Input
										className={scss.input_password}
										{...field}
										placeholder="Имя"
										type="text"
										style={{
											borderColor: errors.Имя ? 'red' : '',
											backgroundColor: errors.Имя
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
							{errors?.Имя && (
								<p className={scss.error_name}>{errors.Имя.message}</p>
							)}
							<Controller
								name="nameUser"
								control={control}
								defaultValue=""
								rules={{ required: 'Это поле обязательно к заполнению' }}
								render={({ field }) => (
									<Input
										className={scss.input_password}
										{...field}
										placeholder="Имя пользователя"
										type="text"
										style={{
											borderColor: errors.nameUser ? 'red' : '',
											backgroundColor: errors.nameUser
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
							{errors?.nameUser && (
								<p className={scss.error_user_name}>
									{errors.nameUser.message}
								</p>
							)}
							<Controller
								name="email"
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
								<p className={scss.error_email}>{errors.email.message}</p>
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
										onChange={(e) => {
											field.onChange(e);
											setPassword(e.target.value);
										}}
									/>
								)}
							/>
							{errors.password && (
								<p className={scss.error_password}>{errors.password.message}</p>
							)}

							<Input.Password
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								iconRender={(visible) =>
									visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
								}
								placeholder="Повторите пароль"
								className={scss.input_password}
								visibilityToggle
								type={showPassword ? 'text' : 'password'}
							/>

							<Checkbox
								checked={showPassword}
								onChange={togglePasswordVisibility}
							>
								<p className={scss.text}>Сохранить вход</p>
							</Checkbox>
						</div>
						<CustomButtonBold children="Зарегистрироваться" type="submit" />
						<Link to="/auth/login">Уже есть аккаунт? Войти</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registration;
