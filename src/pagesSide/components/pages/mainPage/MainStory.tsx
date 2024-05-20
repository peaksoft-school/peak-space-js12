import { useGetStotyQuery } from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import scss from './Style.module.scss';
// import { SetStateAction } from 'react';
// import ModalTs from '@/src/ui/modal/Modal';
// import avatar from '../../../../assets/Ellipse 60.svg';
// import { Progress } from 'antd';

const MainStory = () => {
	const { data, isLoading } = useGetStotyQuery();
	// const [isOpenModalStory, setIsOpenModalStiory] = useState(false);
	// const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

	// const handOpenStory = (index: SetStateAction<number>) => {
	// 	setIsOpenModalStiory(true);
	// 	setCurrentStoryIndex(index);
	// };

	// const handCancelStory = () => {
	// 	setIsOpenModalStiory(false);
	// };

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
		<>
			<div>
				{isLoading ? (
					<p>Loading...</p>
				) : (
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
				)}
			</div>

			{/* <ModalTs open={isOpenModalStory} onCancel={handCancelStory}>
				<div className={scss.modal_story}>
					<div className={scss.span}>
						{data && Array.isArray(data) && (
							<Progress
								strokeColor="white"
								percent={(currentStoryIndex + 1) * (100 / data.length)}
								showInfo={false}
							/>
						)}
					</div>
					<div className={scss.avatring}>
						<img className={scss.avatar} src={avatar} alt="" />
						<div className={scss.h1_p}>
							<h4 className={scss.h4}>_mdeefsx</h4>
							<p>22 часа назад</p>
						</div>
					</div>
				</div>
			</ModalTs> */}
		</>
	);
};

export default MainStory;

// function setIsOpenModalStiory(arg0: boolean) {
// 	throw new Error('Function not implemented.');
// }
// function setIsOpenModalStiory(arg0: boolean) {
// 	throw new Error('Function not implemented.');
// }

// function setCurrentStoryIndex(index: SetStateAction<number>) {
// 	throw new Error('Function not implemented.');
// }
