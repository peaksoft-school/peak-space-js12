import { Input, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import peakSpaceImg from '../../../../assets/peakSpace.png';
import scss from './Registration.module.scss';
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostRegistrationMutation } from '@/src/redux/api/registration';

interface ErrorObject {
	password: string;
	email: string;
	lastName: string;
	firstName: string;
	userName: string;
}

const Registration = () => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const [postRequest] = usePostRegistrationMutation();

	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
	};

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = async (data: any) => {
		try {
			const result = await postRequest(data);
			console.log('Регистрация успешна:', result);
			reset();
			setConfirmPassword('');
		} catch (error) {
			console.error('Ошибка регистрации:', error);
		}
		if (password !== confirmPassword) {
			alert('Пароли не совпадают');
			return null;
		}
		console.log(data);
	};

	return (
		<div className={scss.back_header}>
			<div className={scss.Registration}>
				<div className="container">
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

// ! 2

// import { Input, Checkbox } from 'antd';
// import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
// import { useForm } from 'react-hook-form';
// import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
// import peakSpaceImg from '../../../../assets/peakSpace.png';
// import scss from './Registration.module.scss';
// import { ChangeEvent, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { usePostRegistrationMutation } from '@/src/redux/api/registration';

// interface FormData {
// 	password: string;
// 	email: string;
// 	lastName: string;
// 	firstName: string;
// 	userName: string;
// }

// const Registration = () => {
// 	const [confirmPassword, setConfirmPassword] = useState('');
// 	const [showPassword, setShowPassword] = useState(false);
// 	const [postRequest] = usePostRegistrationMutation();

// 	const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		setConfirmPassword(e.target.value);
// 	};

// 	const togglePasswordVisibility = () => {
// 		setShowPassword(!showPassword);
// 	};

// 	const { register, handleSubmit, reset } = useForm<FormData>({
// 		mode: 'onBlur'
// 	});

// 	const onSubmit = async (data: FormData) => {
// 		console.log(data, 'data');

// 		// if (data.password !== confirmPassword) {
// 		// 	alert('Пароли не совпадают');
// 		// 	return;
// 		// }
// 		try {
// 			const result = await postRequest(data).unwrap();
// 			console.log('Регистрация успешна:', result);
// 			reset();
// 			setConfirmPassword('');
// 		} catch (error) {
// 			console.error('Ошибка регистрации:', error);
// 		}
// 	};

// 	return (
// 		<div className={scss.back_header}>
// 			<div className={scss.Registration}>
// 				<div className="container">
// 					<form onSubmit={handleSubmit(onSubmit)} className={scss.bar}>
// 						<img src={peakSpaceImg} alt="Peak Space" />
// 						<div className={scss.inputs}>
// 							<Input {...register('lastName')} placeholder="Фамилия" />
// 							<Input {...register('firstName')} placeholder="Имя" />
// 							<Input {...register('userName')} placeholder="Имя пользователя" />
// 							<Input
// 								{...register('email')}
// 								placeholder="Номер телефона или email"
// 							/>
// 							<Input.Password
// 								{...register('password')}
// 								placeholder="Пароль"
// 								iconRender={(visible) =>
// 									visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
// 								}
// 							/>
// 							<Input.Password
// 								value={confirmPassword}
// 								onChange={handleConfirmPasswordChange}
// 								placeholder="Повторите пароль"
// 								iconRender={(visible) =>
// 									visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
// 								}
// 								className={scss.input_password}
// 								visibilityToggle
// 								type={showPassword ? 'text' : 'password'}
// 							/>
// 							<Checkbox
// 								checked={showPassword}
// 								onChange={togglePasswordVisibility}
// 							>
// 								<p className={scss.text}>Сохранить вход</p>
// 							</Checkbox>
// 						</div>
// 						<CustomButtonBold type="submit">
// 							Зарегистрироваться
// 						</CustomButtonBold>
// 						<Link to="/auth/login">Уже есть аккаунт? Войти</Link>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Registration;
