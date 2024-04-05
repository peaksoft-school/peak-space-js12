import { FC, ReactNode } from 'react';
import scss from './CustomSaveButton.module.scss';

interface SaveButtonProps {
	children: ReactNode;
}

const CustomSaveButton: FC<SaveButtonProps> = ({ children }) => {
	return (
		<>
			<button className={scss.button}>{children}</button>
		</>
	);
};

export default CustomSaveButton;
