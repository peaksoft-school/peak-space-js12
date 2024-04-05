import { FC } from 'react';
import scss from './CustomInput.module.scss';

interface CustomInputType {
	type: string;
	placeholder: string;
}

const CustomInput: FC<CustomInputType> = ({ type, placeholder }) => {
	return (
		<input className={scss.input} placeholder={placeholder} type={type} />
	);
};

export default CustomInput;
