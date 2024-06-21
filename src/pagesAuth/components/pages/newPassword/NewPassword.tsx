/* eslint-disable @typescript-eslint/no-unused-vars */

import 'react-toastify/dist/ReactToastify.css';
import { Input } from 'antd';
import { usePutPasswordMutation } from '@/src/redux/api/forgetPassword';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import peakSpace from '../../../../assets/peakSpace.png';
import scss from './NewPassword.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ErrorProps {
	email: string;
}

const NewPassword = () => {
	const [putRequest] = usePutPasswordMutation();
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ErrorProps>({ mode: 'onBlur' });

	const notify = () => toast.success('Your account was send message!');
	const navigate = useNavigate();

	const onSubmit = async (data: ErrorProps) => {
		console.log(data);
		const newData = {
			email: data.email,
			link: 'http://localhost:5173/auth/password'
		};
		await putRequest(newData);
		notify();
		navigate('/auth/login',{replace:true});
		reset();
	};

	return (
		<div className={scss.New_password}>
			<div className={scss.bar}>
				<div className="container">
					<form onSubmit={handleSubmit(onSubmit)} className={scss.content}>
						<img src={peakSpace} alt="peakSpace" />
						<div className={scss.section}>
							<p className={scss.title}>Не удается войти?</p>
							<p className={scss.desc}>
								Введите свой электронный адрес, имя пользователя или номер
								телефона
							</p>
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
						</div>
						<CustomButtonBold children="отправить" type="submit" />
						<ToastContainer />
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewPassword;
