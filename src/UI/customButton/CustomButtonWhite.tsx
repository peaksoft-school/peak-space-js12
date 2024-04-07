import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface ButtonWhiteProps {
	children: ReactNode;
	onClick: () => void;
}
const CustomButtonWhite: FC<ButtonWhiteProps> = ({ children, onClick }) => {
	return (
		<>
			<button className={scss.whiteButton} onClick={onClick}>
				{children}
			</button>
		</>
	);
};

export default CustomButtonWhite;
