import { ChangeEvent, FC } from 'react';
import scss from './CustomInput.module.scss';

const CustomInput: FC<CustomInputType> = ({
	onChange,
	value,
	type,
	placeholder
}) => {
	return (
		<>
			<input
				className={scss.input}
				onChange={onChange}
				value={value}
				placeholder={placeholder}
				type={type}
			/>
		</>
	);
};

export default CustomInput;
