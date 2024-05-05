import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';

interface ButtonBoldProps {
	children: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type: any;
}

const CustomButtonBold: FC<ButtonBoldProps> = ({ children, type }) => {
	return (
		<>
			<button className={scss.bold_button} type={type}>
				{children}
			</button>
		</>
	);
};

export default CustomButtonBold;
