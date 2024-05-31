import { useGetStoryQuery } from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import scss from './Style.module.scss';
import { SetStateAction, useState } from 'react';
import ModalTs from '@/src/ui/modal/Modal';
import { Progress } from 'antd';
import elipse from '../../../../assets/Rectangle 76.svg';
import plusIcon from '../../../../assets/Plusicon.svg';
import Webcam from 'react-webcam';

import {
	IconCamera,
	IconMusic,
	IconLetterCase,
	IconStars,
	IconCarambola,
	// IconArrowRight,
	IconPlus,
	IconPhotoSensor2
} from '@tabler/icons-react';

const videoConstraints = {
	width: 480,
	height: 420,
	facingMode: 'user'
};

const MainStory = () => {
	const { data, isLoading } = useGetStoryQuery();
	const [isOpenModalStory, setIsOpenModalStory] = useState(false);
	const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [image, setImage] = useState('');
	const [complain, setComplain] = useState(false);
	const [modalIsOpener, setModalIsOpener] = useState(false);

	const handIsOpenEr = () => {
		setModalIsOpener(true);
	};
	const handICancelEr = () => {
		setModalIsOpener(false);
	};

	const handleOpen = () => {
		setIsOpen(true);
	};
	const handleCancel = () => {
		setIsOpen(false);
	};

	const handOpenStory = (index: SetStateAction<number>) => {
		setIsOpenModalStory(true);
		setCurrentStoryIndex(index);
	};

	const handCancelStory = () => {
		setIsOpenModalStory(false);
	};

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const scrrenShot = (getScreenshot: any) => {
		const ali = getScreenshot();
		setImage(ali);
	};
	const backCamera = () => setImage('');

	return (
		<>
			<div>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<div ref={ref} className={`keen-slider ${scss.keen}`}>
						<div onClick={handleOpen} className={scss.plus_icon}>
							<img className={scss.elipse} src={elipse} alt="" />
							<img className={scss.plus} src={plusIcon} alt="" />

							<h1>Добовить Историю</h1>
						</div>
						<ModalTs open={isOpen} onCancel={handleCancel}>
							<div className={scss.modal_modal}>
								<div className={scss.icon_edit}>
									<IconCamera className={scss.camera} />
									<IconMusic className={scss.music} />
									<IconLetterCase className={scss.letter_case} />
									<IconStars className={scss.stars} />
								</div>
								<div className={scss.video_camera}>
									{image === '' ? (
										<Webcam
											style={{ borderRadius: '20px' }}
											className={scss.video_camera}
											audio={false}
											height={400}
											screenshotFormat="image/jpeg"
											width={500}
											mirrored
											videoConstraints={videoConstraints}
										>
											{({ getScreenshot }) => (
												<button onClick={() => scrrenShot(getScreenshot)}>
													<IconPhotoSensor2 className={scss.iconred} />
												</button>
											)}
										</Webcam>
									) : (
										<img src={image} alt="image" onClick={backCamera} />
									)}
								</div>
								<div className={scss.icon_green}>
									<button onClick={handIsOpenEr} className={scss.button}>
										<IconCarambola onClick={handIsOpenEr} color="green" />
										Близких Друзия
									</button>

									<button className={scss.button3}>
										<IconPlus color="white" />
									</button>
								</div>
								<ModalTs open={modalIsOpener} onCancel={handICancelEr}>
									<div className={scss.modal_left}>
										<h1>gfsdgdfg</h1>
									</div>
								</ModalTs>
							</div>
						</ModalTs>
						{data?.map((item, index) => (
							<div key={item._id} className="keen-slider__slide">
								<div className={scss.testDiv}>
									<img
										onClick={() => {
											handOpenStory(index);
										}}
										className={scss.story_pic}
										src={item.userPhoto}
										alt=""
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<ModalTs open={isOpenModalStory} onCancel={handCancelStory}>
				{data && (
					<div className={scss.modal_story}>
						<div className={scss.span}>
							<Progress
								strokeColor="white"
								percent={(currentStoryIndex + 1) * (100 / data.length)}
								showInfo={false}
							/>
						</div>
						<div className={scss.id_key}>
							<div className={scss.avatring}>
								<img
									className={scss.avatar}
									src={data[currentStoryIndex].userPhoto}
									alt=""
								/>
								<div className={scss.h1_p}>
									<h4 className={scss.h4}>
										{data[currentStoryIndex].userName}
									</h4>
									<p>{data[currentStoryIndex].createdAt}</p>
								</div>
							</div>
							{/* <iframe
								className={scss.iframe}
								width="640"
								height="480"
								src={data[currentStoryIndex].photosOrVideosLink}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe> */}
						</div>
					</div>
				)}
			</ModalTs>
		</>
	);
};

export default MainStory;
