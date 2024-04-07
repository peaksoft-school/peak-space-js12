import { useState } from 'react';
import CustomInput from '@/src/UI/customInput/CustomInput';
import peakSpaceImg from '../../../../assets/peakSpace.png';
import scss from './Registration.module.scss';
import { Input, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import CustomButtonBold from '@/src/UI/customButton/CustomButtonBold';

const Registration = () => {
	const [inputValue, setInputValue] = useState('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handleInputChange = (e: { target: { value: string } }) => {
		setInputValue(e.target.value);
	};

	const handlePasswordChange = (e: { target: { value: string } }) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e: { target: { value: string } }) => {
		setConfirmPassword(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const navigate = useNavigate();
	const navigateLogin = () => {
		navigate('/auth/login');
	};

	return (
		<div className={scss.backHeader}>
			<div className={scss.Registration}>
				<div className="container">
					<div className={scss.bar}>
						<img src={peakSpaceImg} alt="" />
						<div className={scss.inputs}>
							<CustomInput
								type="text"
								placeholder="Повторите пароль "
								onChange={handleInputChange}
								value={inputValue}
							/>
							<CustomInput
								type="text "
								placeholder="Имя"
								onChange={handleInputChange}
								value={inputValue}
							/>
							<CustomInput
								type="text"
								placeholder="Имя пользователя"
								onChange={handleInputChange}
								value={inputValue}
							/>
							<CustomInput
								type="emain"
								placeholder="Номер телефона или email"
								onChange={handleInputChange}
								value={inputValue}
							/>
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
							<Input.Password
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								iconRender={(visible) =>
									visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
								}
								placeholder="Повторите пароль"
								onPressEnter={() => console.log('Нажат Enter')}
								className={scss.inputPassword}
								visibilityToggle
								type={showPassword ? 'text' : 'password'}
							/>

							<Checkbox
								checked={showPassword}
								onChange={togglePasswordVisibility}
							>
								<p className={scss.text}>Сохранть вход</p>
							</Checkbox>
						</div>
						<CustomButtonBold
							children="Зарегистрироваться"
							onClick={navigateLogin}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
