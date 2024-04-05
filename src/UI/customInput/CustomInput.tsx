import { FC } from 'react';
import scss from './CustomInput.module.scss';

interface CustomInput {
	type: string;
	placeholder: string;
}

const input: FC<CustomInput> = ({ type, placeholder }) => {
	return (
		<input className={scss.input} placeholder={placeholder} type={type} />
	);
};

export default input;
