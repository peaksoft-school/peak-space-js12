import {
	useDeleteStoryMutation,
	useGetStoryByIdQuery,
	useGetStoryMyQuery,
	useGetStoryQuery,
	usePostStoryMutation,
	useShortenUrlMutation
} from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import scss from './Style.module.scss';
import { useEffect, useState, useCallback, useRef, ChangeEvent } from 'react';
import ModalTs from '@/src/ui/modal/Modal';
import elipse from '../../../../assets/Rectangle 76.svg';
import plusIcon from '../../../../assets/Plusicon.svg';
import Webcam from 'react-webcam';
import Stories from 'react-insta-stories';
import {
	IconCamera,
	IconLetterCase,
	IconPhotoDown,
	IconCircleFilled,
	IconCircle,
	IconArrowRight,
	IconPhotoUp,
	IconDotsVertical
} from '@tabler/icons-react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

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
	idStory: number;
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
	const [shortenUrl] = useShortenUrlMutation();
	const [postRequest] = usePostStoryMutation();
	const webcamRef = useRef(null);
	const imageRef = useRef<HTMLInputElement>(null);
	const [isLetter, setIsLetter] = useState(false);
	const [description, setDescription] = useState('');
	const typingTimeoutRef = useRef<number | null>(null);

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
		const webcamElement = webcamRef.current?.video;

		if (isOpen && webcamElement) {
			const startStream = async () => {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true
				});
				webcamElement.srcObject = stream;
			};
			startStream();
		} else if (webcamElement) {
			const stream = webcamElement.srcObject;
			if (stream) {
				const tracks = (stream as MediaStream).getTracks();
				tracks.forEach((track) => track.stop());
				webcamElement.srcObject = null;
			}
		}

		return () => {
			if (webcamElement && webcamElement.srcObject) {
				const tracks = (webcamElement.srcObject as MediaStream).getTracks();
				tracks.forEach((track) => track.stop());
				webcamElement.srcObject = null;
			}
		};
	}, [isOpen]);

	const STORY_ITEMS = (
		item: {
			idStory: number;
			linkPublic: string;
			createdAt: string;
			text: null;
		},
		close: () => void
	): MenuProps['items'] => [
		{
			key: '1',
			label: (
				<a onClick={() => handleIsToggleAddContant(close)}>Добавить сторис</a>
			)
		},
		{
			key: '2',
			label: (
				<a onClick={() => handleDeleteStory(item.idStory, close)}>Удалить</a>
			)
		},
		{
			key: '3',
			label: <a onClick={close}>Закрыть</a>
		}
	];

	useEffect(() => {
		if (myStoriesData !== undefined && myStoriesData.length > 0) {
			const myStory: MyStoryType[] = myStoriesData?.map((item) => ({
				idStory: item.idStory,
				url:
					item?.linkPublic ||
					'https://via.placeholder.com/1200x720.png?text=Story+1',
				header: {
					heading: 'Nursultan and Kadyrdin' || 'Default Heading',
					subheading: (item?.createdAt || 'Default Subheading') as string,
					profileImage: elipse || 'https://via.placeholder.com/50'
				},
				seeMore: ({ close }) => (
					<div style={{ padding: 20 }}>
						<p className={scss.description}>{item.text}</p>
						<Space direction="vertical">
							<Space wrap>
								<Dropdown
									className={scss.story_drop_down}
									menu={{ items: STORY_ITEMS(item, close) }}
									placement="bottomLeft"
									arrow={{ pointAtCenter: true }}
								>
									<IconDotsVertical style={{ color: 'white' }} />
								</Dropdown>
							</Space>
						</Space>
					</div>
				),
				duration: 3000,
				type: 'image'
			}));
			setMyStoryData(myStory);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					<div onClick={close} style={{ padding: 20 }}>
						<p
							style={{
								color: 'white',
								position: 'absolute',
								top: '1rem',
								right: '1rem',
								cursor: 'pointer'
							}}
						>
							Закрыть
						</p>
						<p className={scss.description}>{item?.text}</p>
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
		setDescription('');
	};
	const handleCancel = () => {
		setIsOpen(false);
		setImage('');
		setCurrentMyStoryIndex(0);
		setCurrentStoryIndex(0);
		setDescription('');
	};

	const handOpenStory = (id: number) => {
		setIsOpenModalStory(true);
		setUserId(id);
		setCurrentStoryIndex(0);
		setDescription('');
	};

	const handCancelStory = () => {
		setIsOpenModalStory(false);
		setDescription('');
	};
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

	const scrrenShot = async (getScreenshot: () => string | null) => {
		const photoUrl = getScreenshot();
		if (photoUrl !== null) {
			const photoBlob = await fetch(photoUrl).then((res) => res.blob());
			const photoFile = new File([photoBlob], 'screenshot.png', {
				type: 'image/png'
			});

			try {
				const response = await shortenUrl(photoFile).unwrap();

				setImage(response.object);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const backCamera = () => setImage('');

	const handlePostStory = async () => {
		const newData = {
			photoUrlOrVideoUrl: [image],
			description: description,
			idsOfTaggedPeople: [0]
		};

		try {
			await postRequest(newData).unwrap();
			setIsOpenModalStory(false);
			setCurrentMyStoryIndex(0);
			setIsAddContent(true);
			setImage('');
		} catch (error) {
			console.error('Failed to post story:', error);
		}
	};

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		try {
			const response = await shortenUrl(file).unwrap();

			setImage(response.object);
		} catch (error) {
			console.log(error);
		}
	};

	const downloadImage = () => {
		if (image) {
			const link = document.createElement('a');
			link.href = image;
			link.download = 'downloaded_image.png';
			link.click();
		} else {
			console.error('No image to download');
		}
	};
	const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const words = value.split(' ');

		if (words.length <= 10 && value.length <= 30) {
			setDescription(value);
			setIsLetter(true);

			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}

			typingTimeoutRef.current = setTimeout(() => {
				setIsLetter(false);
			}, 3000);
		}
	};

	useEffect(() => {
		return () => {
			if (typingTimeoutRef.current) {
				clearTimeout(typingTimeoutRef.current);
			}
		};
	}, []);

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
							{myStoriesData !== undefined && myStoriesData.length > 0 ? (
								<img
									className={scss.story_circle}
									src={elipse}
									alt="username"
								/>
							) : (
								<>
									<img className={scss.plus} src={plusIcon} alt="plus icon" />
									<h1>Добовить Историю</h1>
								</>
							)}
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
										storyStyles={{
											caption: {
												background: 'red'
											}
										}}
									/>
								) : (
									<>
										<IconArrowRight className={scss.add_icon} />
										<p className={scss.description}>{description}</p>

										<div className={scss.icon_edit}>
											{image === '' ? (
												''
											) : (
												<IconCamera
													className={scss.camera}
													onClick={backCamera}
												/>
											)}

											<IconPhotoUp
												className={scss.music}
												onClick={() => imageRef.current?.click()}
											/>

											<input
												type="file"
												style={{ display: 'none' }}
												ref={imageRef}
												onChange={handleChange}
											/>

											{image === '' ? (
												''
											) : (
												<>
													<IconPhotoDown
														onClick={downloadImage}
														className={scss.letter_case}
													/>
													<IconLetterCase
														className={scss.letter_case}
														onClick={() => setIsLetter((prev) => !prev)}
													/>
													{isLetter ? (
														<div className={scss.form_control}>
															<input
																type="text"
																value={description}
																onChange={handleChangeDescription}
																placeholder="Описание для сториса"
																className={`${scss.input} ${scss.input_alt}`}
																maxLength={30}
															/>
															<span
																className={`${scss.input_border} ${scss.input_border_alt}`}
															></span>
														</div>
													) : null}
												</>
											)}
										</div>
										<div className={scss.video_camera}>
											{image === '' ? (
												<Webcam
													audio={false}
													screenshotFormat="image/jpeg"
													mirrored
													ref={webcamRef}
													videoConstraints={videoConstraints}
												>
													{({ getScreenshot }) => (
														<>
															<IconCircleFilled
																onClick={() =>
																	scrrenShot(() => getScreenshot())
																}
																className={scss.circle_photo}
															/>
															<IconCircle
																className={scss.iconred}
																onClick={() =>
																	scrrenShot(() => getScreenshot())
																}
															/>
														</>
													)}
												</Webcam>
											) : (
												<>
													<img
														src={image}
														alt="image"
														className={scss.image_story}
													/>
													<IconArrowRight
														className={scss.add_icon}
														onClick={handlePostStory}
													/>
												</>
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
