import { FC, ReactNode } from 'react';
import scss from './CustomCancelButton.module.scss';

interface CancelButtonProps {
	children: ReactNode;
}

const CustomCancelButton: FC<CancelButtonProps> = ({ children }) => {
	return (
		<>
			<button className={scss.button}>{children}</button>
		</>
	);
};

export default CustomCancelButton;
