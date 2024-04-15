import { useGetPublicationsQuery } from '@/src/redux/api/publications';
import scss from './Style.module.scss';
const Publications = () => {
	const { data, isLoading } = useGetPublicationsQuery();
	return (
		<div className={scss.content}>
			{isLoading ? (
				<>
					<h1>Loading . . .</h1>
				</>
			) : (
				<>
					{data?.map((item) => (
						<div className={scss.section} key={item._id}>
							<img src={item.img} alt="" />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default Publications;
