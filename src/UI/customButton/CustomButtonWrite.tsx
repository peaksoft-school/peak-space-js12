import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
interface ButtonProps {
	children: ReactNode;
}
const CustomButtonWrite: FC<ButtonProps> = ({ children }) => {
	return (
		<>
			<button className={scss.buttonWhite}> {children}</button>
		</>
	);
};

export default CustomButtonWrite;
