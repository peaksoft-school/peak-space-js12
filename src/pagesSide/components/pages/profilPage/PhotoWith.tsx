import scss from './Style.module.scss';
import { useGetUserPhotoQuery } from '@/src/redux/api/photoWuthUser';

const PhotoWith = () => {
	const { data, isLoading } = useGetUserPhotoQuery();

	return (
		<div className={scss.photo}>
			{isLoading ? (
				<h1>Loading . . .</h1>
			) : (
				<>
					{data?.map((item) => (
						<div className={scss.photo_user} key={item.id}>
							<img src={item.img} alt="" />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default PhotoWith;
