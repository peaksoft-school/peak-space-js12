import { useGetUserPublicQuery } from '@/src/redux/api/userPublic';
import scss from './Style.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { FC, useEffect, useState } from 'react';
interface SliderFotoTypes {
	idModal: number;
}
const SliderFoto: FC<SliderFotoTypes> = ({ idModal }) => {
	const { data, isLoading, error } = useGetUserPublicQuery();
	const [resultOpenModal1, setResultOpenModal1] = useState<number>(0);
	const [resultOpenModal2, setResultOpenModal2] = useState<number>(1);
	if (isLoading) {
		return <h1>Loading...</h1>;
	}
	console.log(idModal, 'idModal');

	if (error) {
		return <h1>Error loading data</h1>;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		setResultOpenModal1(idModal - 1);
		setResultOpenModal2(idModal);
	}, [idModal]);

	return (
		<div className={scss.slider_foto}>
			<Swiper
				style={{ width: '400px' }}
				freeMode={true}
				navigation={true}
				modules={[Navigation]}
			>
				{data &&
					data?.slice(resultOpenModal1, resultOpenModal2).map((item) => (
						<SwiperSlide key={item._id} className={scss.images}>
							<img src={item.img} alt="photo" />
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default SliderFoto;
