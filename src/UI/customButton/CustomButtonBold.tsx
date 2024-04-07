import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface ButtonBoldProps {
	children: ReactNode;
	onClick: () => void;
}

const CustomButtonBold: FC<ButtonBoldProps> = ({ children, onClick }) => {
	return (
		<>
			<button className={scss.boldButton} onClick={onClick}>
				{children}
			</button>
		</>
	);
};

export default CustomButtonBold;
