import { ChangeEvent, FC } from 'react';
import scss from './CustomInput.module.scss';

interface CustomInputType {
	type: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
}

const CustomInput: FC<CustomInputType> = ({
	onChange,
	value,
	type,
	placeholder
}) => {
	return (
		<input
			className={scss.input}
			onChange={onChange}
			value={value}
			placeholder={placeholder}
			type={type}
		/>
	);
};
export default CustomInput;
