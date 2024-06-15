import { useEffect, useRef, useState } from 'react';
import {
	useCreatePostMutation,
	usePostCreateFileMutation,
	useGetGeocodeQuery,
	useGetMyPublicationQuery,
	useDeletePostMutation
} from '@/src/redux/api/publications';
import scss from './Style.module.scss';
import ModalTs from '@/src/ui/modal/Modal';
import { PlusIconSecond } from '@/src/assets/icons';
import { filterValues } from './utils';
import { Switch, Slider } from 'antd';
import { IconArrowLeft, IconDots } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface Types {
	id: number;
	link: string;
}

const Publications = () => {
	const { data } = useGetMyPublicationQuery();
	const [createFile] = usePostCreateFileMutation();
	const [postRequest] = useCreatePostMutation();
	const [deleteRequest] = useDeletePostMutation();
	const [isModal, setIsModal] = useState(false);
	const [modalFile, setModalFile] = useState(false);
	const [modalSecond, setModalSecond] = useState(false);
	const [ellipsis, setEllipsis] = useState(true);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileUrls, setFileUrls] = useState<string[]>([]);
	const [descriptionOne, setDescription] = useState('');
	const [brightness, setBrightness] = useState(1);
	const [contrast, setContrast] = useState(1);
	const [fade, setFade] = useState(0);
	const [saturation, setSaturation] = useState(1);
	const [temperature, setTemperature] = useState(1);
	const [vignette, setVignette] = useState(0);
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [filteretData, setFilteredData] = useState<Types[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string>(
		localStorage.getItem('selectedFilter') || filterValues[0].class
	);
	const [previewImage, setPreviewImage] = useState<string | null>(
		localStorage.getItem('previewImage')
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [showMessage, setShowMessage] = useState<any>({});

	const navigate = useNavigate();

	useEffect(() => {
		if (data?.publications) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const transformedPublications = data.publications.map((item: any) => {
				const id = Object.keys(item)[0];
				const link = item[id];
				return { id: Number(id), link: link };
			});
			setFilteredData(transformedPublications);
		}
	}, [data]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
				},
				(error) => {
					console.error('Error getting location:', error);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	const { data: locationString } = useGetGeocodeQuery(location, {
		skip: !location
	});

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const newFileUrls: string[] = [];
			const formData = new FormData();

			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any);
				const test = JSON.parse(response.data);
				newFileUrls.push(test.object);
				setFileUrls(newFileUrls);
				const imageUrl = URL.createObjectURL(file);
				setPreviewImage(imageUrl);
				localStorage.setItem('previewImage', imageUrl);
				openModal();
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const applyFilter = (filterClass: string, image: HTMLImageElement) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (ctx) {
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.filter = getComputedStyle(document.documentElement).getPropertyValue(
				`--${filterClass}`
			);
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
			return canvas.toDataURL('image/png');
		}
		return null;
	};

	const handleAddPost = async () => {
		const imageElement = document.createElement('img');
		imageElement.src = previewImage || '';

		const newItem = {
			links: fileUrls,
			description: descriptionOne,
			location: locationString || 'Unknown location',
			blockComment: ellipsis
		};

		try {
			await postRequest(newItem).unwrap();
			setDescription('');
			setLocation(null);
			setPreviewImage(null);
			localStorage.removeItem('previewImage');
			localStorage.removeItem('selectedFilter');
			handleCloseModal();
			console.log('Post added successfully');
		} catch (error) {
			console.error('Error adding post:', error);
		}
		imageElement.onload = async () => {
			const filteredImage = applyFilter(selectedFilter, imageElement);
			if (filteredImage) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					dataURLToBlob(filteredImage) as any
				).unwrap();
				setFileUrls([response]);
			}
		};
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ShowMessageAgain = (id: any) => {
		setShowMessage((prevState: { [x: string]: string }) => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	const itsJustFinishModal = () => {
		setModalSecond(false);
		setModalFile(true);
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
		localStorage.removeItem('selectedFilter');
	};

	const handleCloseSecondModal = () => {
		setModalSecond(false);
	};

	const handleOpenModal = () => {
		setIsModal(false);
		setModalSecond(true);
	};

	const handleCloseModal = () => {
		setModalFile(false);
	};

	const backToOne = () => {
		setIsModal(true);
		setModalSecond(false);
	};

	const backToTwo = () => {
		setModalSecond(true);
		setModalFile(false);
	};

	const naviagateToPhoto = (postId: number) => {
		navigate(`/post/${postId}`);
	};

	const removeId = (id: number) => {
		deleteRequest(id);
	};

	const dataURLToBlob = (dataurl: string) => {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	};

	const handleFilterClick = (filterClass: string) => {
		setSelectedFilter(filterClass);
		localStorage.setItem('selectedFilter', filterClass);
	};

	const handleImageStyle = () => {
		return {
			filter: `
        brightness(${brightness})
        contrast(${contrast})
        saturate(${saturation})
        sepia(${(temperature - 1) * 100}%)
      `,
			opacity: `${1 - fade}`,
			boxShadow: vignette
				? `0 0 ${vignette * 100}px ${vignette * 50}px black inset`
				: 'none'
		};
	};

	return (
		<div className={scss.content}>
			<div className={scss.bar} onClick={handleButtonClick}>
				<label>
					<PlusIconSecond />
					<p style={{ textAlign: 'center' }}>
						Добавить <br /> фото
					</p>
				</label>
				<input
					placeholder="file"
					type="file"
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
			</div>
			{filteretData?.map((item) => (
				<>
					<div className={scss.photos} key={item.id}>
						<img
							src={item.link ? item.link : ''}
							className={scss.image}
							alt="photos"
							onClick={() => naviagateToPhoto(item.id)}
						/>
						<button onClick={() => ShowMessageAgain(item.id)}>
							<IconDots />
						</button>

						<div
							className={showMessage[item.id] ? scss.isMessage_left : scss.none}
						>
							<p onClick={() => removeId(item.id)}>удалить пост</p>
						</div>
					</div>
				</>
			))}

			<ModalTs open={modalFile} onCancel={handleCloseModal}>
				<div className={scss.finish_modal}>
					<div className={scss.modal_des}>
						<div className={scss.finish_header}>
							<button onClick={backToTwo} className={scss.arrow_button}>
								<IconArrowLeft />
							</button>
							<div>
								<p>Редактировать</p>
							</div>
						</div>

						<div style={{ display: 'flex' }}>
							<div>
								{previewImage && (
									<img
										style={{
											maxWidth: '640px',
											height: '581.6px',
											objectFit: 'cover',
											borderRadius: '5px'
										}}
										src={previewImage}
										alt="Preview"
										className={`${scss[selectedFilter]} ${scss.filterPreview}`}
									/>
								)}
							</div>
							<div className={scss.buttons}>
								<div className={scss.uis}>
									<textarea
										value={descriptionOne}
										onChange={(e) => setDescription(e.target.value)}
										placeholder="Добавить подпись..."
									></textarea>
									<p className={scss.line}></p>
									<div className={scss.boolean}>
										<p>
											{ellipsis
												? 'Выключить комментарии'
												: 'Включить комментарии'}
										</p>
										<Switch
											checked={ellipsis}
											onChange={() => {
												setEllipsis(!ellipsis);
											}}
										/>
									</div>
									<p className={scss.line}></p>
								</div>
								<div>
									<button onClick={handleCloseModal}>Отмена</button>
									<button onClick={handleAddPost}>Отправить</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ModalTs>

			<ModalTs open={modalSecond} onCancel={handleCloseSecondModal}>
				<div className={scss.second}>
					<div className={scss.back}>
						<div className={scss.second_header}>
							<button onClick={backToOne} className={scss.arrow_button}>
								<IconArrowLeft />
							</button>
							<div>
								<p>Редактировать</p>
							</div>
							<button onClick={itsJustFinishModal}>Далее</button>
						</div>
						<div className={scss.center}>
							<div className={scss.about}>
								{previewImage && (
									<img
										style={handleImageStyle()}
										src={previewImage}
										alt="Preview"
										className={`${scss[selectedFilter]} ${scss.filterPreview}`}
									/>
								)}
							</div>
							<div className={scss.lines}>
								<div>
									<label>Яркость</label>
									<Slider
										value={brightness}
										onChange={(val) => setBrightness(val)}
										min={0}
										max={4}
										step={0.01}
									/>
								</div>
								<div>
									<label>Контраст</label>
									<Slider
										value={contrast}
										onChange={(val) => setContrast(val)}
										min={0}
										max={2}
										step={0.01}
									/>
								</div>
								<div>
									<label>Выгорание</label>
									<Slider
										value={fade}
										onChange={(val) => setFade(val)}
										min={0}
										max={1}
										step={0.01}
									/>
								</div>
								<div>
									<label>Насыщенность</label>
									<Slider
										value={saturation}
										onChange={(val) => setSaturation(val)}
										min={0}
										max={2}
										step={0.01}
									/>
								</div>
								<div>
									<label>Температура</label>
									<Slider
										value={temperature}
										onChange={(val) => setTemperature(val)}
										min={0.5}
										max={1.5}
										step={0.01}
									/>
								</div>

								<div>
									<label>Виньетка</label>
									<Slider
										value={vignette}
										onChange={(val) => setVignette(val)}
										min={0}
										max={1}
										step={0.01}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ModalTs>

			<ModalTs open={isModal} onCancel={closeModal}>
				<div className={scss.bar_modal}>
					<div className={scss.is_modal}>
						<div className={scss.header_modal}>
							<p>Редактировать</p>
							<h4 onClick={handleOpenModal}>Далее</h4>
						</div>
						<div className={scss.second_}>
							<div className={scss.imagePreview}>
								{previewImage && (
									<img
										style={{
											maxWidth: '640px',
											height: '581.6px',
											objectFit: 'cover',
											borderRadius: '5px'
										}}
										src={previewImage}
										alt="Preview"
										className={`${scss[selectedFilter]} ${scss.filterPreview}`}
									/>
								)}
							</div>
							<div className={scss.filterSelection}>
								{filterValues.map((filter) => (
									<div className={scss.filter} key={filter.class}>
										<img
											src={previewImage || ''}
											alt={filter.name}
											className={`${scss.filterPreview} ${scss[filter.class]}`}
											onClick={() => handleFilterClick(filter.class)}
										/>
										<p>{filter.name}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</ModalTs>
		</div>
	);
};

export default Publications;
