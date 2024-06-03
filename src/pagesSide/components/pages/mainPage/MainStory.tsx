import { useGetStoryQuery, usePostStoryMutation } from '@/src/redux/api/story';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useRef, useState } from 'react';
import ModalTs from '@/src/ui/modal/Modal';
import { Progress } from 'antd';
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

const data23 = [
	{
		img: 'https://ca.slack-edge.com/T023L1WBFLH-U05UR1PLN10-d76277dee9b1-192',
		name: 'MUSTAFA',
		age: '19+',
		_id: '1'
	},
	{
		name: 'NURSULTAN',
		img: 'https://ca.slack-edge.com/T023L1WBFLH-U05UEGBFL4C-g180a7b25fb7-192',
		age: '17+',
		_id: '2'
	},
	{
		name: 'KASYM',
		img: 'https://ca.slack-edge.com/T023L1WBFLH-U0452B11NQ4-e0f8bfc721b7-192',
		age: '18+',
		_id: '3'
	},
	{
		name: 'KADYRDIN',
		img: 'https://ca.slack-edge.com/T023L1WBFLH-U05UMUYCCB1-2b4d42ec54e5-72',
		age: 17,
		_id: '4'
	}
];

const videoConstraints = {
	width: 480,
	height: 420,
	facingMode: 'user'
};

const MainStory = () => {
	const { data, isLoading } = useGetStoryQuery();
	const [postRequest] = usePostStoryMutation();
	const [isOpenModalStory, setIsOpenModalStory] = useState(false);
	const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [image, setImage] = useState('');
	const [complain, setComplain] = useState(false);
	const [modalIsOpener, setModalIsOpener] = useState(false);
	const [isOpenCamera, setIsOpenCamera] = useState(false);
	console.log(data, 'allAli');

	const webcamRef = useRef(null);
	const [recording, setRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [recordedChunks, setRecordedChunks] = useState([]);

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

	const handOpenStory = (index: any) => {
		setIsOpenModalStory(true);
		setCurrentStoryIndex(index);
	};

	const handCancelStory = () => {
		setIsOpenModalStory(false);
	};

	const handleDeleteImage = () => {
		setIsOpenCamera(true);
		setImage('');
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

	const scrrenShot = () => {
		if (webcamRef.current) {
			const screenshot = webcamRef.current.getScreenshot();
			setImage(screenshot);
		}
	};

	const backCamera = () => setImage('');

	// const downloadImage = () => {
	// 	const link = document.createElement('a');
	// 	link.href = image;
	// 	link.download = 'downloaded-image.jpg';
	// 	document.body.appendChild(link);
	// 	link.click();
	// 	document.body.removeChild(link);
	// };

	const uploadImage = async (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result as string);
		};
		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			try {
				await postRequest(formData);
				reader.readAsDataURL(file);
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};

	const startRecording = () => {
		if (webcamRef.current) {
			const stream = webcamRef.current.video.srcObject;
			const options = { mimeType: 'video/webm; codecs=vp9' };
			const mediaRecorder = new MediaRecorder(stream, options);

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					setRecordedChunks((prev) => [...prev, event.data]);
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
			setRecording(false);
		}
	};

	const downloadRecording = () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		document.body.appendChild(a);
		// a.style = 'display: none';
		a.href = url;
		a.download = 'recording.webm';
		a.click();
		window.URL.revokeObjectURL(url);
	};

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
							<h1>Добавить Историю</h1>
						</div>
						<ModalTs open={isOpen} onCancel={handleCancel}>
							<div className={scss.modal_modal}>
								<div className={scss.icon_edit}>
									<IconCamera
										onClick={handleOpenCamera}
										className={scss.camera}
									/>
									<IconMusic className={scss.music} />
									<IconLetterCase className={scss.letter_case} />
									<IconStars className={scss.stars} />
									<div className={scss.change_state}>
										<button onClick={changeStateStore}>
											<Point onClick={changeStateStore} />
										</button>
									</div>
									<div
										className={complain ? scss.there : scss.this}
										onClick={changeStateStore}
									>
										{/* <button
											className={scss.down_load}
											onClick={downloadRecording}
										>
											Сохранить
										</button> */}
										{recordedChunks.length > 0 && (
											<div>
												<div>
													<button onClick={downloadRecording}>Download</button>
												</div>
												<button
													className={scss.delete}
													onClick={handleDeleteImage}
												>
													Удалить
												</button>
											</div>
										)}
									</div>
								</div>
								<div className={scss.video_camera}>
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
												onClick={scrrenShot}
												className={scss.iconred}
											/>
											{recording ? (
												// <button onClick={stopRecording}>Stop Recording</button>
												<IconVideoOff
													className={scss.icon_video_off}
													color="white"
													onClick={stopRecording}
												/>
											) : (
												// <button onClick={startRecording}>
												// 	Start Recording
												// </button>
												<IconVideo color="white" onClick={startRecording} />
											)}
										</>
									) : (
										<>
											<img src={image} alt="image" onClick={backCamera} />
										</>
									)}
								</div>
								{/* {recordedChunks.length > 0 && (
									<div>
										<button onClick={downloadRecording}>Download</button>
									</div>
								)} */}
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
										<button onClick={handIsOpenEr} className={scss.button}>
											<IconCarambola onClick={handIsOpenEr} color="green" />
											Близких Друзей
										</button>

										<button className={scss.button3}>
											<IconPlus color="white" />
										</button>
									</div>
								</div>
								<ModalTs open={modalIsOpener} onCancel={handICancelEr}>
									<div className={scss.modal_left}>
										{data23.map((item) => (
											<div className={scss.group} key={item._id}>
												<img src={item.img} alt="" />
												<h4>{item.name}</h4>
												<p>{item.age}</p>
												<input type="checkbox" placeholder="checkbox" />
											</div>
										))}
										<div className={scss.div_button}>
											<button onClick={handICancelEr}>Далее</button>
										</div>
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
									<img src={item.userName} alt="" />
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
						</div>
					</div>
				)}
			</ModalTs>
		</>
	);
};

export default MainStory;
