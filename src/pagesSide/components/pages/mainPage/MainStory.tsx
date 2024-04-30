import { useGetStotyQuery } from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import scss from './MainPage.module.scss';
const MainStory = () => {
	const { data, isLoading } = useGetStotyQuery();

	const [ref] = useKeenSlider<HTMLDivElement>({
		breakpoints: {
			'(min-width: 400px)': {
				slides: { perView: 5, spacing: 5 }
			},
			'(min-width: 1000px)': {
				slides: { perView: 5, spacing: 10 }
			}
		},
		slides: { perView: 1 }
	});
	return (
		<div>
			{isLoading ? (
				<>
					<p>Loading . .</p>
				</>
			) : (
				<>
					<div ref={ref} className={`keen-slider ${scss.keen}`}>
						{data?.map((item) => (
							<div key={item._id} className="keen-slider__slide">
								<div>
									<img className={scss.story_pic} src={item.backImg} alt="" />
									<img
										className={scss.slide_avatar}
										src={item.storyImg}
										alt=""
									/>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default MainStory;
