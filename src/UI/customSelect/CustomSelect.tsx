import scss from './CustomSelect.module.scss';

const CustomSelect = () => {
	return (
		<div className={scss.select}>
			<select className={scss.select} name="" id="">
				<option className={scss.option} value="bATKEN">
					BATKEN
				</option>
				<option className={scss.option} value="нарын">
					НАРЫН
				</option>
			</select>
		</div>
	);
};

export default CustomSelect;
