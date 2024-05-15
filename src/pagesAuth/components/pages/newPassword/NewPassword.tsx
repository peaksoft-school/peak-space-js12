/* eslint-disable @typescript-eslint/no-unused-vars */
import scss from './NewPassword.module.scss';
import peakSpace from '../../../../assets/peakSpace.png';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CustomButtonBold from '@/src/ui/customButton/CustomButtonBold';
import { Controller, useForm } from 'react-hook-form';

interface ErrorProps {
	password: string;
}

const NewPassword = () => {
	const [showPassword] = useState<boolean>(false);

	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ErrorProps>({ mode: 'onBlur' });

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = (data: any) => {
		console.log(data);
		reset();
	};

	return (
		<div className={scss.New_password}>
			<div className={scss.bar}>
				<div className="container">
					<form onSubmit={handleSubmit(onSubmit)} className={scss.content}>
						<img src={peakSpace} alt="" />
						<div className={scss.section}>
							<p className={scss.title}>Не удается войти?</p>
							<p className={scss.desc}>
								Введите свой электронный адрес, имя пользователя или номер
								телефона
							</p>
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
									/>
								)}
							/>
							{errors.password && (
								<p className={scss.error_password}>{errors.password.message}</p>
							)}
						</div>
						<CustomButtonBold children="Войти" type="submit" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewPassword;
