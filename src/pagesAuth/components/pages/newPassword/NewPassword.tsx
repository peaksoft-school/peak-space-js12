import scss from './NewPassword.module.scss';
import peakSpace from '../../../../assets/peakSpace.png';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButtonBold from '@/src/UI/customButton/CustomButtonBold';

const NewPassword = () => {
	const [password, setPassword] = useState<string>('');
	const [showPassword] = useState<boolean>(false);
	const navigate = useNavigate();

	const handlePasswordChange = (e: { target: { value: string } }) => {
		setPassword(e.target.value);
	};
	const navigateUserPassword = () => {
		navigate('/auth/login');
	};

	return (
		<div className={scss.NewPassword}>
			<div className={scss.bar}>
				<div className="container">
					<div className={scss.content}>
						<img src={peakSpace} alt="" />
						<div className={scss.section}>
							<p className={scss.title}>Не удается войти?</p>
							<p className={scss.desc}>
								Введите свой электронный адрес, имя пользователя или номер
								телефона
							</p>
							<Input.Password
								value={password}
								onChange={handlePasswordChange}
								iconRender={(visible) =>
									visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
								}
								placeholder="Пароль"
								onPressEnter={() => console.log('Нажат Enter')}
								className={scss.inputPassword}
								visibilityToggle
								type={showPassword ? 'text' : 'password'}
							/>
						</div>
						<CustomButtonBold children="Войти" onClick={navigateUserPassword} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPassword;
