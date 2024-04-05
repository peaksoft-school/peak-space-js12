import scss from './CustomSelect.module.scss';

const CustomSelect = () => {
	const data = [
		{
			name: 'BATKEN'
		},
		{
			name: 'NARYN'
		},
		{
			name: 'ысык-кол'
		},
		{
			name: 'Жалал-абад'
		},
		{
			name: 'талас'
		},
		{
			name: 'Ош'
		},
		{
			name: 'чуй'
		}
	];
	return (
		<div className={scss.select}>
			<select className={scss.select} name="" id="">
				{data.map((item) => (
					<option value="">{item.name}</option>
				))}
			</select>
		</div>
	);
};

export default CustomSelect;
