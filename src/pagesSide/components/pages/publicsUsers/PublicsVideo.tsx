import { useGetPublicsVideoFoodQuery } from '@/src/redux/api/publications';
import scss from './Style.module.scss';

function PublicsVideo() {
	const { data, isLoading } = useGetPublicsVideoFoodQuery();
	return (
		<div className={scss.video}>
			{isLoading ? (
				<>
					<p>Loading</p>
				</>
			) : (
				<>
					{data?.map((item) => (
						<div key={item.id} className={scss.title_video}>
							<iframe
								src={item.link}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					))}
				</>
			)}
		</div>
	);
}

export default PublicsVideo;
