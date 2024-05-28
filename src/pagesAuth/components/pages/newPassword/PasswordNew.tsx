import { useCreatePasswordMutation } from '@/src/redux/api/forgetPassword';
import { Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import scss from './NewPassword.module.scss';
import { useState } from 'react';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import { useNavigate, useParams } from 'react-router-dom';

interface ErrorProps {
	password: string;
	confirm: string;
	uuid: string;
}

const PasswordNew = () => {
	const [postRequest] = useCreatePasswordMutation();
	const [showPassword] = useState(false);
	const navigate = useNavigate();
	const { uuid } = useParams();

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ErrorProps>({ mode: 'onBlur' });

	const onSubmit = async (data: ErrorProps) => {
		const newData = {
			password: data.password,
			confirm: data.confirm,
			uuid
		};
		if (data.password !== data.confirm) {
			alert('Пароли не совпадают');
			return;
		}
		console.log(data);
		await postRequest(newData);
		reset();
	};

	const navigateToBack = () => {
		navigate(-1);
	};

	return (
		<div className={scss.PasswordNew}>
			<div className={scss.bar}>
				<p>Создайте новый пароль</p>
				<form onSubmit={handleSubmit(onSubmit)} className={scss.content}>
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
								placeholder="Пароль"
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
							{errors.password.message}
						</span>
					)}

					<Controller
						{...register('confirm')}
						control={control}
						defaultValue=""
						rules={{
							required: 'Подтверждение пароля '
						}}
						render={({ field }) => (
							<Input.Password
								{...field}
								iconRender={(visible) =>
									visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
								}
								placeholder="Подтвердите Пароль"
								className={scss.input_password}
								visibilityToggle
								type={showPassword ? 'text' : 'password'}
								style={{
									borderColor: errors.confirm ? 'red' : '',
									backgroundColor: errors.confirm
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
					{errors.confirm && (
						<span className={scss.error_confirm}>{errors.confirm.message}</span>
					)}

					<CustomButtonBold children={'сохранить'} type={'submit'} />
				</form>
				<button onClick={navigateToBack} className={scss.button}>
					отмена
				</button>
			</div>
		</div>
	);
};

export default PasswordNew;
