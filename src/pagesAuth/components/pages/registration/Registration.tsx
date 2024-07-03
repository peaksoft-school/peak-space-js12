import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { usePostRegistrationMutation } from '@/src/redux/api/auth';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import peakSpaceImg from '../../../../assets/peakSpace.png';
import scss from './Registration.module.scss';
import { Input, message } from 'antd';

interface ErrorObject {
	password: string;
	email: string;
	lastName: string;
	firstName: string;
	userName: string;
}

const Registration = () => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [password, setPassword] = useState('');
	const [postRequest, { isLoading }] = usePostRegistrationMutation();
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ErrorObject>({ mode: 'onBlur' });

	const onSubmit = async (data: any) => {
		if (password !== confirmPassword) {
			messageApi.open({
				type: 'warning',
				content: 'Пароли не совпадают'
			});
			return;
		} else {
			const response = (await postRequest(
				data
			)) as REGISTRATION.PostRegistrationResponse;
			if ('data' in response) {
				if (response.data) {
					console.log('Full Response:', response);

					navigate(
						`/auth/confirm-by-email/${response.data?.userId}` as string,
						{
							replace: true
						}
					);
					reset();
					setConfirmPassword('');
				}
			}
			if (response.error) {
				console.log(response.error.data);
				if (response.error.status === 400) {
					messageApi.open({
						type: 'warning',
						content: 'большое шести'
					});
				} else if (response.error.status === 417) {
					messageApi.open({
						type: 'warning',
						content: response.error.data?.message
					});
				}
			}
			console.log(response);
		}
	};

	return (
		<div className={scss.back_header}>
			<div className={scss.Registration}>
				<div className="container">
					{contextHolder}
					<form onSubmit={handleSubmit(onSubmit)} className={scss.bar}>
						<img src={peakSpaceImg} alt="Peak Space" />
						<div className={scss.inputs}>
							<Controller
								{...register('lastName')}
								control={control}
								defaultValue=""
								rules={{ required: 'Это поле обязательно к заполнению' }}
								render={({ field }) => (
									<Input
										className={scss.input_password}
										{...field}
										placeholder="Фамилия"
										type="text"
										style={{
											borderColor: errors.lastName ? 'red' : '',
											backgroundColor: errors.lastName
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
							{errors?.lastName && (
								<p className={scss.text_error}>{errors.lastName.message}</p>
							)}
							<Controller
								{...register('firstName')}
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
											borderColor: errors.firstName ? 'red' : '',
											backgroundColor: errors.firstName
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
							{errors?.firstName && (
								<p className={scss.error_name}>{errors.firstName.message}</p>
							)}
							<Controller
								{...register('userName')}
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
											borderColor: errors.userName ? 'red' : '',
											backgroundColor: errors.userName
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
							{errors?.userName && (
								<p className={scss.error_user_name}>
									{errors.userName.message}
								</p>
							)}
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
								<p className={scss.error_email}>{errors.email.message}</p>
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
							/>
						</div>
						<CustomButtonBold
							disabled={isLoading}
							children={isLoading ? 'Вход...' : 'Зарегистрироваться'}
							type="submit"
						/>
						<Link to="/auth/login">Уже есть аккаунт? Войти</Link>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registration;
