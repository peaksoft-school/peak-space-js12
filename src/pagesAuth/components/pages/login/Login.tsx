import scss from './Login.module.scss';
import peakSpace from '../../../../assets/peakSpace.png';
import CustomInput from '@/src/UI/customInput/CustomInput';
import { useState } from 'react';
import { Input, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { GoogleImg } from '@/src/assets/icons';
import { Link } from 'react-router-dom';
import line from '../../../../assets/line.svg';

import CustomButtonBold from '@/src/UI/customButton/CustomButtonBold';
const Login = () => {
	const [numberEmail, setNumberEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={scss.Login}>
			<div className={scss.section}>
				<div className="container">
					<div className={scss.aside}>
						<img src={peakSpace} alt="" />
						<div className={scss.form}>
							<CustomInput
								type="text"
								placeholder="Номер телефона, имя пользователя или email"
								value={numberEmail}
								onChange={(e) => setNumberEmail(e.target.value)}
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

							<Checkbox
								checked={showPassword}
								onChange={togglePasswordVisibility}
							>
								<p className={scss.text}>Сохранить вход</p>
							</Checkbox>
							<CustomButtonBold
								children="Войти"
								onClick={togglePasswordVisibility}
							/>
							<div className={scss.googleOut}>
								<GoogleImg
									className={scss.GoogleImg}
									onClick={() => togglePasswordVisibility}
								/>
								<Link to="https://www.google.com/account/about/">
									Войти через Google
								</Link>
							</div>
							<Link className={scss.link} to="/auth/forgetPassword">
								Забыли пароль
							</Link>
							<div className={scss.lines}>
								<img src={line} alt="" /> <p style={{ color: 'gray' }}>или</p>{' '}
								<img src={line} alt="" />
							</div>
						</div>

						<Link to="/auth/registration">Зарегистрироваться</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
