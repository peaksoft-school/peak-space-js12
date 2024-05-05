import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface CustomButtonProps {
	children: ReactNode;
	onClick: () => void;
}
const CustomButton: FC<CustomButtonProps> = ({ children, onClick }) => {
	return (
		<>
			<button className={scss.custom_button} onClick={onClick}>
				{children}
			</button>
		</>
	);
};

export default CustomButton;
