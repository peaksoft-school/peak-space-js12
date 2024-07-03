// @ts-nocheck
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmByEmailMutation } from '@/src/redux/api/auth';
import scss from './Login.module.scss';
import { Input } from 'antd';
import CustomButton from '@/src/ui/customButton/CustomButton';

interface ConfirmByEmailForm {
	codeInEmail: string;
}

const ConfirmByEmail = () => {
	const { id } = useParams<{ id: string }>();
	const [confirmByEmail, { isLoading }] = useConfirmByEmailMutation();
	const {
		control,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<ConfirmByEmailForm>({ mode: 'onBlur' });
	const navigate = useNavigate();
	const initialTime = Number(localStorage.getItem('timeLeft')) || 180;
	const [timeLeft, setTimeLeft] = useState<number>(initialTime);

	useEffect(() => {
		if (timeLeft <= 0) {
			navigate('/auth/registration');
			return;
		}

		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => {
				const newTime = prevTime - 1;
				localStorage.setItem('timeLeft', newTime.toString());
				return newTime;
			});
		}, 1000);

		return () => clearInterval(timerId);
	}, [timeLeft, navigate]);

	const onSubmit = async (data: ConfirmByEmailForm) => {
		const response = await confirmByEmail({ ...data, id }).unwrap();
		if ('data' in response) {
			if (response.data) {
				const { token, id }: any = response.data;
				localStorage.setItem('auth_token', token);
				localStorage.setItem('isAuth', 'true');
				localStorage.setItem('userId', id);
				localStorage.removeItem('timeLeft');
			}
		}
		reset();
		navigate('/', { replace: true });
	};

	return (
		<div className={scss.ConfirmByEmail}>
			<form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
				<div className={scss.email}>
					<div className={scss.requite}>
						<div className={scss.text}>
							<p className={scss.p}>
								Код подтверждения был отправлен на вашу почту
							</p>
							<p>
								Оставшееся время: {Math.floor(timeLeft / 60)}:
								{('0' + (timeLeft % 60)).slice(-2)}
							</p>
						</div>
						<Controller
							name="codeInEmail"
							control={control}
							defaultValue=""
							rules={{ required: 'Пожалуйста, введите код из email.' }}
							render={({ field }) => (
								<Input
									className={scss.input}
									{...field}
									placeholder="Код из email"
									style={{
										borderColor: errors.codeInEmail ? 'red' : '',
										backgroundColor: errors.codeInEmail
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
						{errors.codeInEmail && (
							<span className={scss.error}>{errors.codeInEmail.message}</span>
						)}
					</div>
					<div>
						<CustomButton
							type="submit"
							disabled={isLoading}
							children={isLoading ? 'Вход...' : 'Войти'}
						/>
					</div>
				</div>
			</form>
			<div className={scss.timer}></div>
		</div>
	);
};

export default ConfirmByEmail;
