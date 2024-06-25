// import {
// 	useDeleteStoryMutation,
// 	useGetStoryByIdQuery,
// 	useGetStoryMyQuery,
// 	useGetStoryQuery
// } from '@/src/redux/api/story';
// import { useKeenSlider } from 'keen-slider/react';
// import 'keen-slider/keen-slider.min.css';
// import scss from './Style.module.scss';
// import { useEffect, useState } from 'react';
// import ModalTs from '@/src/ui/modal/Modal';
// import elipse from '../../../../assets/Rectangle 76.svg';
// import plusIcon from '../../../../assets/Plusicon.svg';
// import Webcam from 'react-webcam';
// import Stories from 'react-insta-stories';
// import {
// 	IconCamera,
// 	IconMusic,
// 	IconLetterCase,
// 	IconStars,
// 	IconPhotoSensor2
// } from '@tabler/icons-react';

// const videoConstraints = {
// 	width: 500,
// 	height: 600,
// 	facingMode: 'user'
// };

// interface Story {
// 	url: string;
// 	header?: {
// 		heading: string;
// 		subheading: string;
// 		profileImage: string;
// 	};
// 	seeMore?: ({ close }: { close: () => void }) => JSX.Element;
// 	duration?: number;
// 	type?: string;
// }

// type StoriesType = Story[];

// interface MyStoryType {
// 	url: string;
// 	header?: {
// 		heading: string;
// 		subheading: string;
// 		profileImage: string;
// 	};
// 	seeMore?: ({ close }: { close: () => void }) => JSX.Element;
// 	duration?: number;
// 	type?: string;
// }

// interface ChildrenProps {
// 	getScreenshot: () => string | null;
// }

// const MainStory = () => {
// 	const { data, isLoading } = useGetStoryQuery();
// 	const [isOpenModalStory, setIsOpenModalStory] = useState(false);
// 	const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
// 	const [currentMyStoryIndex, setCurrentMyStoryIndex] = useState(0);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [image, setImage] = useState('');
// 	const [isAddContent, setIsAddContent] = useState(true);
// 	const [userId, setUserId] = useState<number | undefined>(undefined);
// 	const [myStoryData, setMyStoryData] = useState<MyStoryType[]>([]);
// 	const [deleteStory] = useDeleteStoryMutation();
// 	const [storiesData, setStoriesData] = useState<StoriesType>([
// 		{
// 			url: 'https://via.placeholder.com/1200x720.png?text=Story+1',
// 			header: {
// 				heading: 'Original Header 1',
// 				subheading: 'Original Subheading 1',
// 				profileImage: 'https://via.placeholder.com/50'
// 			},
// 			duration: 3000,
// 			type: 'image'
// 		}
// 	]);
// 	const { data: storiesDataById } = useGetStoryByIdQuery(userId, {
// 		skip: userId === undefined
// 	});

// 	const { data: myStoriesData } = useGetStoryMyQuery();

// 	const handleIsToggleAddContant = (close) => {
// 		setIsAddContent((prev) => !prev);
// 		close();
// 	};

// 	// eslint-disable-next-line react-hooks/exhaustive-deps
// 	const handleDeleteStory = async (idStory: number, close) => {
// 		await deleteStory(idStory);
// 		close();
// 	};

// 	useEffect(() => {
// 		if (myStoriesData !== undefined && myStoriesData.length > 0) {
// 			const myStory: MyStoryType[] = myStoriesData?.map((item) => ({
// 				url:
// 					item?.linkPublic ||
// 					'https://via.placeholder.com/1200x720.png?text=Story+1',
// 				header: {
// 					heading: 'Alihan Isaev Handsome Boy' || 'Default Heading',
// 					subheading: (item?.createdAt || 'Default Subheading') as string,
// 					profileImage: elipse || 'https://via.placeholder.com/50'
// 				},
// 				seeMore: ({ close }) => (
// 					<div style={{ background: 'white', padding: 20 }}>
// 						See more content here
// 						<button onClick={() => handleIsToggleAddContant(close)}>
// 							add Story
// 						</button>
// 						<button onClick={() => handleDeleteStory(item?.idStory, close)}>
// 							delete
// 						</button>
// 					</div>
// 				),
// 				duration: 3000,
// 				type: 'image'
// 			}));
// 			setMyStoryData(myStory);
// 		}
// 	}, [handleDeleteStory, myStoriesData]);

// 	useEffect(() => {
// 		if (userId !== undefined && storiesDataById) {
// 			const story: StoriesType = storiesDataById?.map((item) => ({
// 				url:
// 					item?.photosOrVideosLink?.[0] ||
// 					'https://via.placeholder.com/1200x720.png?text=Story+1',
// 				header: {
// 					heading: item?.userName || 'Default Heading',
// 					subheading: (item?.createdAt || 'Default Subheading') as string,
// 					profileImage: item?.userPhoto || 'https://via.placeholder.com/50'
// 				},
// 				seeMore: ({ close }) => (
// 					<div onClick={close} style={{ background: 'white', padding: 20 }}>
// 						See more content here
// 					</div>
// 				),
// 				duration: 3000,
// 				type: 'image'
// 			}));
// 			setStoriesData(story);
// 		}
// 	}, [storiesDataById, userId]);

// 	const handleOpen = () => {
// 		setIsOpen(true);
// 		setCurrentMyStoryIndex(0);
// 	};
// 	const handleCancel = () => {
// 		setIsOpen(false);
// 		setCurrentMyStoryIndex(0);
// 	};

// 	const handOpenStory = (id: number) => {
// 		setIsOpenModalStory(true);
// 		setUserId(id);
// 		setCurrentStoryIndex(0);
// 	};

// 	const handCancelStory = () => setIsOpenModalStory(false);
// 	const handleNextStory = () =>
// 		setCurrentStoryIndex((prevIndex) =>
// 			prevIndex < storiesData.length ? prevIndex + 1 : prevIndex
// 		);
// 	const handleOnPrevious = () =>
// 		setCurrentStoryIndex((prevIndex) => prevIndex - 1);

// 	const handleNextMyStory = () =>
// 		setCurrentMyStoryIndex((prevIndex) => prevIndex + 1);
// 	const handleMyOnPrevious = () =>
// 		setCurrentMyStoryIndex((prevIndex) => prevIndex - 1);

// 	const [ref] = useKeenSlider<HTMLDivElement>({
// 		breakpoints: {
// 			'(min-width: 400px)': {
// 				slides: { perView: 5, spacing: 5 }
// 			},
// 			'(min-width: 1000px)': {
// 				slides: { perView: 5, spacing: 10 }
// 			}
// 		},
// 		slides: { perView: 1 }
// 	});

// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	const scrrenShot = (getScreenshot: () => string | null) => {
// 		const photoUrl = getScreenshot();
// 		if (photoUrl !== null) {
// 			setImage(photoUrl);
// 		}
// 	};
// 	const backCamera = () => setImage('');

// 	return (
// 		<>
// 			<div>
// 				{isLoading ? (
// 					<p>Loading...</p>
// 				) : (
// 					<div ref={ref} className={`keen-slider ${scss.keen}`}>
// 						<div
// 							onClick={handleOpen}
// 							className={`${scss.plus_icon} keen-slider__slide`}
// 						>
// 							<img className={scss.elipse} src={elipse} alt="elipse" />
// 							<img className={scss.plus} src={plusIcon} alt="plus icon" />
// 							<h1>Добовить Историю</h1>
// 						</div>
// 						<ModalTs open={isOpen} onCancel={handleCancel}>
// 							<div className={scss.modal_modal}>
// 								{myStoriesData !== undefined &&
// 								myStoriesData.length > 0 &&
// 								isAddContent ? (
// 									<Stories
// 										stories={myStoryData}
// 										width={500}
// 										height={600}
// 										defaultInterval={1500}
// 										currentIndex={currentMyStoryIndex}
// 										onNext={handleNextMyStory}
// 										onPrevious={handleMyOnPrevious}
// 										keyboardNavigation={true}
// 										onAllStoriesEnd={handleCancel}
// 									/>
// 								) : (
// 									<>
// 										<div className={scss.icon_edit}>
// 											<IconCamera
// 												className={scss.camera}
// 												onClick={backCamera}
// 											/>
// 											<IconMusic className={scss.music} />
// 											<IconLetterCase className={scss.letter_case} />
// 											<IconStars className={scss.stars} />
// 										</div>
// 										<div className={scss.video_camera}>
// 											{image === '' ? (
// 												<Webcam
// 													audio={false}
// 													screenshotFormat="image/jpeg"
// 													mirrored
// 													videoConstraints={videoConstraints}
// 												>
// 													{({ getScreenshot }: ChildrenProps) => (
// 														<IconPhotoSensor2
// 															className={scss.iconred}
// 															onClick={() => scrrenShot(getScreenshot)}
// 														/>
// 													)}
// 												</Webcam>
// 											) : (
// 												<img src={image} alt="image" />
// 											)}
// 										</div>
// 									</>
// 								)}
// 							</div>
// 						</ModalTs>

// 						{data?.map((item) => (
// 							<div key={item.userId} className="keen-slider__slide">
// 								<div className={scss.testDiv}>
// 									<img
// 										onClick={() => handOpenStory(item.userId)}
// 										className={scss.story_pic}
// 										src={item?.avatar}
// 										alt="userimage"
// 									/>
// 									<img
// 										onClick={() => handOpenStory(item.userId)}
// 										className={scss.story_circle}
// 										src={item?.avatar}
// 										alt="username"
// 									/>
// 									<h3 className={scss.story_user_name}>{item?.username}</h3>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>

// 			<ModalTs open={isOpenModalStory} onCancel={handCancelStory}>
// 				<Stories
// 					stories={storiesData}
// 					width={500}
// 					height={600}
// 					defaultInterval={1500}
// 					currentIndex={currentStoryIndex}
// 					onNext={handleNextStory}
// 					onPrevious={handleOnPrevious}
// 					keyboardNavigation={true}
// 					onAllStoriesEnd={handCancelStory}
// 				/>
// 			</ModalTs>
// 		</>
// 	);
// };

// export default MainStory;

import {
	useDeleteStoryMutation,
	useGetStoryByIdQuery,
	useGetStoryMyQuery,
	useGetStoryQuery
} from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import scss from './Style.module.scss';
import { useEffect, useState, useCallback } from 'react';
import ModalTs from '@/src/ui/modal/Modal';
import elipse from '../../../../assets/Rectangle 76.svg';
import plusIcon from '../../../../assets/Plusicon.svg';
import Webcam from 'react-webcam';
import Stories from 'react-insta-stories';
import {
	IconCamera,
	IconMusic,
	IconLetterCase,
	IconStars,
	IconPhotoSensor2
} from '@tabler/icons-react';

const videoConstraints = {
	width: 500,
	height: 600,
	facingMode: 'user'
};

interface Story {
	url: string;
	header?: {
		heading: string;
		subheading: string;
		profileImage: string;
	};
	seeMore?: ({ close }: { close: () => void }) => JSX.Element;
	duration?: number;
	type?: string;
}

type StoriesType = Story[];

interface MyStoryType {
	url: string;
	header?: {
		heading: string;
		subheading: string;
		profileImage: string;
	};
	seeMore?: ({ close }: { close: () => void }) => JSX.Element;
	duration?: number;
	type?: string;
}

interface ChildrenProps {
	getScreenshot: () => string | null;
}

const MainStory = () => {
	const { data, isLoading } = useGetStoryQuery();
	const [isOpenModalStory, setIsOpenModalStory] = useState(false);
	const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
	const [currentMyStoryIndex, setCurrentMyStoryIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [image, setImage] = useState('');
	const [isAddContent, setIsAddContent] = useState(true);
	const [userId, setUserId] = useState<number | undefined>(undefined);
	const [myStoryData, setMyStoryData] = useState<MyStoryType[]>([]);
	const [deleteStory] = useDeleteStoryMutation();
	const [storiesData, setStoriesData] = useState<StoriesType>([
		{
			url: 'https://via.placeholder.com/1200x720.png?text=Story+1',
			header: {
				heading: 'Original Header 1',
				subheading: 'Original Subheading 1',
				profileImage: 'https://via.placeholder.com/50'
			},
			duration: 3000,
			type: 'image'
		}
	]);
	const { data: storiesDataById } = useGetStoryByIdQuery(userId, {
		skip: userId === undefined
	});

	const { data: myStoriesData } = useGetStoryMyQuery();

	const handleIsToggleAddContant = useCallback((close: () => void) => {
		setIsAddContent((prev) => !prev);
		close();
	}, []);

	const handleDeleteStory = useCallback(
		async (idStory: number, close: () => void) => {
			await deleteStory(idStory);
			close();
			setIsOpenModalStory(false);
		},
		[deleteStory]
	);

	useEffect(() => {
		if (myStoriesData !== undefined && myStoriesData.length > 0) {
			const myStory: MyStoryType[] = myStoriesData?.map((item) => ({
				url:
					item?.linkPublic ||
					'https://via.placeholder.com/1200x720.png?text=Story+1',
				header: {
					heading: 'Nursultan and Kadyrdin' || 'Default Heading',
					subheading: (item?.createdAt || 'Default Subheading') as string,
					profileImage: elipse || 'https://via.placeholder.com/50'
				},
				seeMore: ({ close }) => (
					<div style={{ background: 'white', padding: 20 }}>
						See more content here
						<button onClick={() => handleIsToggleAddContant(close)}>
							add Story
						</button>
						<button onClick={() => handleDeleteStory(item?.idStory, close)}>
							delete
						</button>
					</div>
				),
				duration: 3000,
				type: 'image'
			}));
			setMyStoryData(myStory);
		}
	}, [myStoriesData, handleDeleteStory, handleIsToggleAddContant]);

	useEffect(() => {
		if (userId !== undefined && storiesDataById) {
			const story: StoriesType = storiesDataById?.map((item) => ({
				url:
					item?.photosOrVideosLink?.[0] ||
					'https://via.placeholder.com/1200x720.png?text=Story+1',
				header: {
					heading: item?.userName || 'Default Heading',
					subheading: (item?.createdAt || 'Default Subheading') as string,
					profileImage: item?.userPhoto || 'https://via.placeholder.com/50'
				},
				seeMore: ({ close }) => (
					<div onClick={close} style={{ background: 'white', padding: 20 }}>
						See more content here
					</div>
				),
				duration: 3000,
				type: 'image'
			}));
			setStoriesData(story);
		}
	}, [storiesDataById, userId]);

	const handleOpen = () => {
		setIsOpen(true);
		setCurrentMyStoryIndex(0);
	};
	const handleCancel = () => {
		setIsOpen(false);
		setCurrentMyStoryIndex(0);
	};

	const handOpenStory = (id: number) => {
		setIsOpenModalStory(true);
		setUserId(id);
		setCurrentStoryIndex(0);
	};

	const handCancelStory = () => setIsOpenModalStory(false);
	const handleNextStory = () =>
		setCurrentStoryIndex((prevIndex) =>
			prevIndex < storiesData.length ? prevIndex + 1 : prevIndex
		);
	const handleOnPrevious = () =>
		setCurrentStoryIndex((prevIndex) => prevIndex - 1);

	const handleNextMyStory = () =>
		setCurrentMyStoryIndex((prevIndex) => prevIndex + 1);
	const handleMyOnPrevious = () =>
		setCurrentMyStoryIndex((prevIndex) => prevIndex - 1);

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

	const scrrenShot = (getScreenshot: () => string | null) => {
		const photoUrl = getScreenshot();
		if (photoUrl !== null) {
			setImage(photoUrl);
		}
	};
	const backCamera = () => setImage('');

	return (
		<>
			<div>
				{isLoading ? (
					<p>Loading...</p>
				) : (
					<div ref={ref} className={`keen-slider ${scss.keen}`}>
						<div
							onClick={handleOpen}
							className={`${scss.plus_icon} keen-slider__slide`}
						>
							<img className={scss.elipse} src={elipse} alt="elipse" />
							<img className={scss.plus} src={plusIcon} alt="plus icon" />
							<h1 className={scss.story_user_name}>Добавить историю</h1>
						</div>
						<ModalTs open={isOpen} onCancel={handleCancel}>
							<div className={scss.modal_modal}>
								{myStoriesData !== undefined &&
								myStoriesData.length > 0 &&
								isAddContent ? (
									<Stories
										stories={myStoryData}
										width={500}
										height={600}
										defaultInterval={1500}
										currentIndex={currentMyStoryIndex}
										onNext={handleNextMyStory}
										onPrevious={handleMyOnPrevious}
										keyboardNavigation={true}
										onAllStoriesEnd={handleCancel}
									/>
								) : (
									<>
										<div className={scss.icon_edit}>
											<IconCamera
												className={scss.camera}
												onClick={backCamera}
											/>
											<IconMusic className={scss.music} />
											<IconLetterCase className={scss.letter_case} />
											<IconStars className={scss.stars} />
										</div>
										<div className={scss.video_camera}>
											{image === '' ? (
												<Webcam
													audio={false}
													screenshotFormat="image/jpeg"
													mirrored
													videoConstraints={videoConstraints}
												>
													{({ getScreenshot }: ChildrenProps) => (
														<IconPhotoSensor2
															className={scss.iconred}
															onClick={() => scrrenShot(getScreenshot)}
														/>
													)}
												</Webcam>
											) : (
												<img src={image} alt="image" />
											)}
										</div>
									</>
								)}
							</div>
						</ModalTs>

						{data?.map((item) => (
							<div key={item.userId} className="keen-slider__slide">
								<div className={scss.testDiv}>
									<img
										onClick={() => handOpenStory(item.userId)}
										className={scss.story_pic}
										src={item?.avatar}
										alt="userimage"
									/>
									<img
										onClick={() => handOpenStory(item.userId)}
										className={scss.story_circle}
										src={item?.avatar}
										alt="username"
									/>
									<h3 className={scss.story_user_name}>{item?.username}</h3>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<ModalTs open={isOpenModalStory} onCancel={handCancelStory}>
				<Stories
					stories={storiesData}
					width={500}
					height={600}
					defaultInterval={1500}
					currentIndex={currentStoryIndex}
					onNext={handleNextStory}
					onPrevious={handleOnPrevious}
					keyboardNavigation={true}
					onAllStoriesEnd={handCancelStory}
				/>
			</ModalTs>
		</>
	);
};

export default MainStory;
