import scss from './CustomTextarea.module.scss';

const CustomTextTarea = () => {
	return (
		<div>
			<textarea
				className={scss.textarea}
				placeholder="text"
				name="myText"
			></textarea>
		</div>
	);
};

export default CustomTextTarea;
