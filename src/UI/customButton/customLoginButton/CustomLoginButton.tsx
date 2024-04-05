import { FC, ReactNode } from 'react';
import scss from './CustomLoginButton.module.scss';

interface LoginButtonProps {
	children: ReactNode;
}

const CustomLoginButton: FC<LoginButtonProps> = ({ children }) => {
	return (
		<>
			<button className={scss.button}>{children}</button>
		</>
	);
};

export default CustomLoginButton;
