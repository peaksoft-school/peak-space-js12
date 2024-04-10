import { FC } from 'react';
import scss from './CustomInput.module.scss';

interface CustomInputType {
	type: string;
	placeholder: string;
	// onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	// value: string;
	// name: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	style: any;
}

const CustomInput: FC<CustomInputType> = ({
	// onChange,
	type,
	placeholder,
	// name,
	// value,
	style
}) => {
	return (
		<input
			className={scss.input}
			// onChange={onChange}
			placeholder={placeholder}
			type={type}
			// value={value}
			// name={name}
			style={style}
		/>
	);
};
export default CustomInput;
