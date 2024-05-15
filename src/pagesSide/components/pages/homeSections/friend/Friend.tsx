import React from 'react';
import scss from './Style.module.scss';
import CustomButton from '@/src/ui/customButton/CustomButton';
import woman from '../../../../../assets/Ellipse 107.svg';
import woman1 from '../../../../../assets/Ellipse 108.svg';
import woman2 from '../../../../../assets/Bolotova.svg';
import woman3 from '../../../../../assets/Kamila.svg';
import woman4 from '../../../../../assets/Migara.svg';
import woman5 from '../../../../../assets/homyakova.svg';
import woman6 from '../../../../../assets/Omor.svg';

const Friend: React.FC = () => {
	const data = [
		{
			img: woman,
			name: 'Usubalieva',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: woman1,
			name: 'Mamatov',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: woman2,
			name: 'Ziashow',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: woman3,
			name: 'ulanbek Uulu',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: woman4,
			name: 'ulanbek Uulu',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: woman5,
			name: 'ulanbek Uulu',
			title: 'Lorem ipsum dolor sit amet'
		},
		{
			img: woman6,
			name: 'ulanbek Uulu',
			title: 'Lorem ipsum dolor sit amet'
		}
	];

	return (
		<div className={scss.container}>
			<div className={scss.contentype}></div>
			{data.map((item, index) => (
				<div className={scss.avatar} key={index}>
					<img className={scss.image} src={item.img} alt={item.name} />
					<div className={scss.third}>
						<h4>{item.name}</h4>
						<p>{item.title}</p>
					</div>
					<CustomButton onClick={() => {}}>Дружить</CustomButton>
				</div>
			))}
		</div>
	);
};

export default Friend;
