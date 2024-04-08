import { ChangeEvent, FC } from 'react';
import scss from './CustomTextInput.module.scss';
interface CustomInputTextType {
	type: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextInput: FC<CustomInputTextType> = ({
	onChange,

	type,
	placeholder
}) => {
	return (
		<div>
			<input
				className={scss.input}
				onChange={onChange}
				placeholder={placeholder}
				type={type}
			/>
		</div>
	);
};

export default CustomTextInput;
