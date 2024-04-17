import CustomButton from '@/src/UI/customButton/CustomButton';
import scss from './Style.module.scss';
import group from '../../../../../assets/друзья.svg';
import kollegi from '../../../../../assets/Коллеги.svg';
const GroupPage = () => {
	const data = [
		{
			img: group,
			name: 'Usubalieva',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: group,
			name: 'Usubalieva',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: kollegi,
			name: 'Usubalieva',
			title: 'Lorem ipsum dolor sit amet'
		}
	];
	return (
		<div className={scss.section}>
			{data.map((item, index) => (
				<div className={scss.avataring} key={index}>
					<img className={scss.groupImg} src={item.img} alt={item.name} />
					<div className={scss.first}>
						<h4>{item.name}</h4>
						<p>{item.title}</p>
					</div>
					<CustomButton onClick={() => {}}>Дружить</CustomButton>
				</div>
			))}
		</div>
	);
};

export default GroupPage;
