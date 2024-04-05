import scss from './customTextTarea.module.scss';

const CustomTextTarea = () => {
	return (
		<div className={scss.content}>
			<textarea placeholder="text" name="myText"></textarea>
		</div>
	);
};

export default CustomTextTarea;
