import scss from './CustomInput.module.scss';


const CustomInputText = () => {
	return (
		<div className={scss.container}>
			<input className={scss.input} type="text" placeholder="text" />
		</div>
	);
};

export default CustomInputText;
