import {
	useDeleteStoryMutation,
	useGetStoryByIdQuery,
	useGetStoryMyQuery,
	useGetStoryQuery,
	usePostStoryMutation
} from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useRef, useState, useEffect, KeyboardEvent } from 'react';
import ModalTs from '@/src/ui/modal/Modal';
import elipse from '../../../../assets/Rectangle 76.svg';
import plusIcon from '../../../../assets/Plusicon.svg';
import Webcam from 'react-webcam';
import { Point } from '@/src/assets/icons';
import {
	IconCamera,
	IconMusic,
	IconLetterCase,
	IconStars,
	IconCarambola,
	IconPlus,
	IconPhotoSensor2,
	IconPhotoPlus,
	IconVideo,
	IconVideoOff
} from '@tabler/icons-react';
import scss from './Style.module.scss';
import { usePostCreateFileMutation } from '@/src/redux/api/publications';
import Stories from 'react-insta-stories';
// import { Result } from 'antd';

const videoConstraints = {
	width: 480,
	height: 420,
	facingMode: 'user'
};

const MainStory = () => {
	const { data: stories, isLoading: storiesLoading } = useGetStoryQuery();
	const [postRequest] = usePostStoryMutation();
	const [isOpenModalStory, setIsOpenModalStory] = useState<boolean>(false);
	const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [image, setImage] = useState<string>('');
	const [complain, setComplain] = useState<boolean>(false);
	const [modalIsOpener, setModalIsOpener] = useState<boolean>(false);
	const [isOpenCamera, setIsOpenCamera] = useState<boolean>(false);
	const webcamRef = useRef(null);
	const [recording, setRecording] = useState<boolean>(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [getId, setGetId] = useState<string | undefined>();
	const [progress, setProgress] = useState<number>(0);
	const progressTimer = useRef(null);
	// const [isFillingStories, setIsFillingStories] = useState<boolean>(false);
	const [postFile] = usePostCreateFileMutation();
	const [storyUrl, setStoryUrl] = useState<string>('');
	const [addedInput, setAddedInput] = useState<boolean>(false);
	const [description, setDescription] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [greenCircle, setGreenCircle] = useState<boolean>(false);
	const [currentModalStory, setCurrentModalStory] = useState<any>(null);
	const [deleteRequest] = useDeleteStoryMutation();
	const { data: storiesId } = useGetStoryMyQuery();

	const [postApiRequest] = usePostCreateFileMutation();
	const [videoUrl, setVideoUrl] = useState<string>('');
	const [testArr, setTestArr] = useState<string>('');

	const [Arr, setArr] = useState([]);

	const { data: storyById } = useGetStoryByIdQuery(getId);
	const handleDelete = async (id: number) => {
		await deleteRequest(id);
		setImage('');
	};
	const handleOpenInput = () => {
		setAddedInput(!addedInput);
	};

	const changeStateStore = () => {
		setComplain(!complain);
	};
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

	const handOpenStory = (id: string) => {
		console.log(id, 'alihan');

		setGetId(id);
		setIsOpenModalStory(true);
		setProgress(0);
		progressTimer.current = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(progressTimer.current!);
					setIsOpenModalStory(false);
					return 100;
				}
				return prev + 0.5; // Adjust the increment value as needed
			});
		}, 25);

		// Find the story by ID and set it as the current modal story
		const foundStory = stories?.find((story) => story.userId === id);
		setCurrentModalStory(foundStory);
	};
	const handCancelStory = () => {
		setIsOpenModalStory(false);
	};

	const handleOpenCamera = () => setIsOpenCamera((prev) => !prev);

	const [ref] = useKeenSlider({
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

	const takeScreenshot = () => {
		if (webcamRef.current) {
			console.log(webcamRef, webcamRef.current);

			const screenshot: string = webcamRef.current.getScreenshot();

			setImage(screenshot);
		}
	};

	const backCamera = () => setImage('');

	const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result as string);
				setVideoUrl(''); // Clear the video URL if an image is uploaded
			};
			const formData = new FormData();
			formData.append('file', file);
			try {
				const result = await postFile(formData);
				if ('data' in result) {
					const resJson = JSON.parse(result.data);
					setVideoUrl(resJson.object);
				}
			} catch (error) {
				console.error('Error uploading image:', error);
			}
			reader.readAsDataURL(file);
		}
	};

	const handlePost = async () => {
		const newData = {
			photoUrlOrVideoUrl: [storyUrl],
			description: text,
			idsOfTaggedPeople: [0]
		};
		const result = await postRequest(newData);
		console.log(result);
		if ('data' in result) {
			if (result.data?.httpStatus === 'OK') {
				setGreenCircle(true);
				setIsOpen(false);
			}
		}
	};

	const startRecording = () => {
		if (webcamRef.current) {
			const stream = webcamRef.current.video.srcObject;
			const options = { mimeType: 'video/webm; codecs=vp9' };
			const mediaRecorder = new MediaRecorder(stream, options);
			const chunks: BlobPart[] | undefined = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunks.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				const blob = new Blob(chunks, { type: 'video/webm' });

				const formData = new FormData();
				formData.append('file', blob);

				try {
					const response = await postApiRequest(formData);
					// Проверяем, что response.data содержит ссылку на сохраненное видео
					if ('data' in response && 'url' in response.data) {
						setArr((prev) => [...prev, response.data.url]); // Добавляем новую ссылку в массив состояния
					}
				} catch (error) {
					console.error('Error uploading video:', error);
				}
			};

			mediaRecorder.start();
			setMediaRecorder(mediaRecorder);
			setRecording(true);
		}
	};

	const stopRecording = () => {
		if (mediaRecorder) {
			mediaRecorder.stop();
			setMediaRecorder(null);
			setRecording(false);
		}
	};

	const downloadRecording = () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		document.body.appendChild(a);
		a.href = url;
		a.download = 'recording.webm';
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const hadnleChangeInputValue = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setText(description);
			setAddedInput(false);
			setDescription('');
		}
	};

	useEffect(() => {
		return () => {
			if (mediaRecorder) {
				mediaRecorder.stream
					.getTracks()
					.forEach((track: { stop: () => any }) => track.stop());
				mediaRecorder.stop();
			}
		};
	}, [mediaRecorder]);

	console.log(image);

	return (
		<>
			<div>
				{storiesLoading ? (
					<p>Loading...</p>
				) : (
					<div ref={ref} className={`keen-slider ${scss.keen}`}>
						<div onClick={handleOpen} className={scss.plus_icon}>
							<img className={scss.elipse} src={elipse} alt="" />

							{greenCircle ? (
								<>
									<div className={scss.ok_circle}></div>
								</>
							) : (
								<>
									<img className={scss.plus} src={plusIcon} alt="" />
									<h1>Добавить Историю</h1>
								</>
							)}
							<div></div>
						</div>
						<ModalTs open={isOpen} onCancel={handleCancel}>
							<div className={scss.modal_modal}>
								<div className={scss.icon_edit}>
									<IconCamera
										onClick={handleOpenCamera}
										className={scss.camera}
									/>
									<div className={scss.change_state}>
										{/* <button onClick={changeStateStore}>
											<Point onClick={changeStateStore} />
										</button> */}
									</div>
									<button className={scss.added_iput} onClick={handleOpenInput}>
										Отметка
									</button>

									<div
										className={complain ? scss.there : scss.this}
										onClick={changeStateStore}
									>
										{/* {recordedChunks ? (
											<div className={scss.reconr}>
												<div className={scss.down_delet}>
													<button onClick={downloadRecording}>Сохранить</button>
													<hr />

													<button
														className={scss.button_down}
														onClick={() => handleDelete}
													>
														Удалить
													</button>
												</div>
											</div>
										) : null} */}
									</div>
								</div>
								<div className={scss.video_camera}>
									<p>{text}</p>
									{addedInput ? (
										<>
											<input
												value={description}
												onChange={(e) => {
													setDescription(e.target.value);
												}}
												onKeyPress={(e) => {
													hadnleChangeInputValue(e);
												}}
												type="text"
												placeholder="text"
											/>
										</>
									) : null}
									{storiesId?.map((item) => (
										<>
											{recordedChunks ? (
												<div className={scss.reconr}>
													<div className={scss.down_delet}>
														<button onClick={downloadRecording}>
															Сохранить
														</button>
														<hr />

														<button
															className={scss.button_down}
															onClick={() => handleDelete(item.idStory)}
														>
															Удалить
														</button>
													</div>
												</div>
											) : null}
											<div className={scss.key_working} key={item.idStory}>
												{/* <h1>{item.linkPublic}</h1> */}
												<img
													className={scss.link_public}
													src={image}
													alt="photo"
													// onClick={backCamera}
												/>
												{videoUrl && <video src={videoUrl} controls />}

												<div>
													{Arr.length > 0 && (
														<div>
															{Arr.map((videoUrl, index) => (
																<div key={index}>
																	<video controls>
																		<source src={videoUrl} type="video/webm" />
																	</video>
																</div>
															))}
														</div>
													)}
												</div>

												<p>{item.createdAt}</p>
												<p>{item.text}</p>
											</div>
										</>
									))}
									{isOpenCamera && image === '' ? (
										<>
											<Webcam
												style={{ borderRadius: '20px' }}
												className={scss.video_camera}
												audio={true}
												height={400}
												ref={webcamRef}
												mirrored
												screenshotFormat="image/jpeg"
												width={501}
												videoConstraints={videoConstraints}
											/>
											<IconPhotoSensor2
												onClick={takeScreenshot}
												className={scss.iconred}
											/>
											{recording ? (
												<IconVideoOff
													className={scss.icon_video_off}
													color="white"
													onAuxClick={takeScreenshot}
													onClick={stopRecording}
												/>
											) : (
												<IconVideo color="white" onClick={startRecording} />
											)}
										</>
									) : (
										<>
											{!storiesId?.length ? (
												<img src={image} alt="image" onClick={backCamera} />
											) : (
												''
											)}
										</>
									)}
								</div>

								<div className={scss.icon_green}>
									<IconPhotoPlus
										onClick={uploadImage}
										className={scss.icon_plus_photo}
									/>
									<input
										placeholder="file"
										type="file"
										onChange={uploadImage}
									/>

									<div className={scss.handle_icon}>
										<button className={scss.button3} onClick={handlePost}>
											<IconPlus color="white" />
										</button>
									</div>
								</div>
							</div>
						</ModalTs>
						{stories?.map((item) => (
							<div key={item.userId} className="keen-slider__slide">
								<div className={scss.testDiv}>
									<img
										onClick={() => handOpenStory(item.userId)}
										className={scss.story_pic}
										src={
											item.avatar &&
											'https://s3-alpha-sig.figma.com/img/05e8/e319/6a3565c67e1ffec70fc0377f3667177d?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQJWd9ONzO4DIUtc6M7difbPOnq0CDE4cyUsgCI51P3z-hV4-HcuZIG0M~9Df4TmUFSCPJkW0AlRmFo9YOe89z5vP13W0mnh2SNjIpFpRT1KQ9DN~J~hCQsJhSQsBfPxst-oE8qrhR2oMRP5tbtsziYUXStIPnyIwnMfWN1wZuBU72is-Zyg11XQjm~vY9J90zVm6drdIlL0Jh9CUp0aIfMCzpn5uMQfAsxmVEgBtvifBWIx5349Xqcqv7t3SQbRiFhtjSxZJ6bJdeHYIzggEmVJXFWv1Hps8KWe86407~XwHUHTU~7fyw2rUfR4jbSPMBHB9srp9SkR2qqCnpKWBg__'
										}
										alt="avatar"
									/>
								</div>
							</div>
						))}
					</div>
				)}
				<ModalTs open={isOpenModalStory} onCancel={handCancelStory}>
					<Stories
						stories={stories}
						// renderers={storyById}
						defaultInterval={1500}
						width={432}
						height={768}
					/>
				</ModalTs>
			</div>
		</>
	);
};

export default MainStory;
