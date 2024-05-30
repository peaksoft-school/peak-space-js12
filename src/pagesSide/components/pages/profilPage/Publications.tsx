// import { useEffect, useRef, useState } from 'react';
// import {
// 	useCreatePostMutation,
// 	usePostCreateFileMutation,
// 	useGetGeocodeQuery
// } from '@/src/redux/api/publications';
// import scss from './Style.module.scss';
// import ModalTs from '@/src/ui/modal/Modal';
// import { PlusIconSecond } from '@/src/assets/icons';
// const Publications = () => {
// 	const [isModal, setIsModal] = useState(false);
// 	const [modalFile, setModalFile] = useState(false);
// 	const fileInputRef = useRef<HTMLInputElement>(null);
// 	const [createFile] = usePostCreateFileMutation();
// 	const [postRequest] = useCreatePostMutation();
// 	const [fileUrls, setFileUrls] = useState<string[]>([]);
// 	const [description, setDescription] = useState('');
// 	const [location, setLocation] = useState<{
// 		latitude: number;
// 		longitude: number;
// 	} | null>(null);
// 	useEffect(() => {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(
// 				(position) => {
// 					const { latitude, longitude } = position.coords;
// 					setLocation({ latitude, longitude });
// 				},
// 				(error) => {
// 					console.error('Error getting location:', error);
// 				}
// 			);
// 		} else {
// 			console.error('Geolocation is not supported by this browser.');
// 		}
// 	}, []);
// 	const { data: locationString } = useGetGeocodeQuery(location, {
// 		skip: !location
// 	});
// 	const handleButtonClick = () => {
// 		if (fileInputRef.current) {
// 			fileInputRef.current.click();
// 		}
// 	};
// 	const handleFileChange = async (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const files = event.target.files;
// 		if (files) {
// 			const newFileUrls: string[] = [];
// 			const uploadPromises = Array.from(files).map(async (file) => {
// 				const formData = new FormData();
// 				formData.append('file', file);

// 				try {
// 					// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 					const response: any = await createFile(formData as any).unwrap();
// 					newFileUrls.push(response);
// 					return response;
// 				} catch (error) {
// 					console.error('Error uploading file:', error);
// 				}
// 			});
// 			await Promise.all(uploadPromises);
// 			setFileUrls((prevFileUrls) => [...prevFileUrls, ...newFileUrls]);
// 			openModal();
// 		}
// 	};
// 	const handleAddPost = async () => {
// 		const newItem = {
// 			links: fileUrls,
// 			description: description,
// 			location: locationString || 'Unknown location',
// 			blockComment: true
// 		};
// 		try {
// 			await postRequest(newItem).unwrap();
// 			setDescription('');
// 			setLocation(null);
// 			setFileUrls([]);
// 			closeModal();
// 			console.log('Post added successfully');
// 		} catch (error) {
// 			console.error('Error adding post:', error);
// 		}
// 	};
// 	const openModal = () => {
// 		setIsModal(true);
// 	};
// 	const closeModal = () => {
// 		setIsModal(false);
// 	};

// 	const handleOpenModal = () => {
// 		setModalFile(true);
// 	};
// 	const handleCloseModal = () => {
// 		setModalFile(false);
// 	};
// 	return (
// 		<div className={scss.content}>
// 			<div className={scss.bar} onClick={handleButtonClick}>
// 				<label>
// 					<PlusIconSecond />
// 					<p style={{ textAlign: 'center' }}>
// 						Добавить <br /> фото
// 					</p>
// 				</label>
// 				<input
// 					placeholder="file"
// 					type="file"
// 					ref={fileInputRef}
// 					style={{ display: 'none' }}
// 					onChange={handleFileChange}
// 					multiple
// 				/>
// 			</div>

// 			<ModalTs open={modalFile} onCancel={handleCloseModal}>
// 				<div>
// 					<p>ddfsafas</p>
// 				</div>
// 			</ModalTs>

// 			<ModalTs open={isModal} onCancel={closeModal}>
// 				<div className={scss.bar_modal}>
// 					<div className={scss.is_modal}>
// 						<div className={scss.inputs}>
// 							<h3>Добавьте пост</h3>
// 							<input
// 								value={description}
// 								onChange={(e) => setDescription(e.target.value)}
// 								type="text"
// 								placeholder="Описание"
// 							/>
// 						</div>
// 						<div className={scss.buttons}>
// 							<button onClick={closeModal}>Отмена</button>
// 							<button onClick={handleAddPost}>Отправить</button>
// 						</div>
// 					</div>
// 				</div>
// 			</ModalTs>
// 		</div>
// 	);
// };
// export default Publications;

// 2

import { createContext, useEffect, useRef, useState } from 'react';
import {
	useCreatePostMutation,
	usePostCreateFileMutation,
	useGetGeocodeQuery
} from '@/src/redux/api/publications';
import scss from './Style.module.scss';
import ModalTs from '@/src/ui/modal/Modal';
import { PlusIconSecond } from '@/src/assets/icons';
import { Box, Container, Grid } from '@mui/material';
import ImageField from './ImageField';
import CustomFilter from './CustomFilter';
import FilterTabs from './FilterTabs';
import InstaFilter from './InstaFilter';

export const FilterContext = createContext();
const Publications = () => {
	const [isModal, setIsModal] = useState(false);
	const [modalFile, setModalFile] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createFile] = usePostCreateFileMutation();
	const [postRequest] = useCreatePostMutation();
	const [fileUrls, setFileUrls] = useState<string[]>([]);
	const [tabFilter, setTabFilter] = useState('instaFilter');
	const [filterClass, setFilterClass] = useState('');
	const [customFilter, setCustomFilter] = useState({
		contrast: 100,
		brightness: 100,
		saturate: 100,
		sepia: 0,
		gray: 0
	});

	const value = {
		tabFilter,
		setTabFilter,
		filterClass,
		setFilterClass,
		customFilter,
		setCustomFilter
	};

	const [previewUrls, setPreviewUrls] = useState<string[]>([]);
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

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
		if (files) {
			const previewUrls = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			);
			setPreviewUrls(previewUrls);
			handleOpenModal(); // Открываем модальное окно при выборе файлов

			// Задержка для открытия модального окна перед началом загрузки
			setTimeout(async () => {
				await uploadFiles(files);
			}, 0);
		}
	};

	const uploadFiles = async (files: FileList) => {
		const newFileUrls: string[] = [];
		const uploadPromises = Array.from(files).map(async (file) => {
			const formData = new FormData();
			formData.append('file', file);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createFile(formData as any).unwrap();
				newFileUrls.push(response);
				return response;
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		});
		await Promise.all(uploadPromises);
		setFileUrls((prevFileUrls) => [...prevFileUrls, ...newFileUrls]);
	};

	const handleAddPost = async () => {
		const newItem = {
			links: fileUrls,
			description: description,
			location: locationString || 'Unknown location',
			blockComment: true
		};
		try {
			await postRequest(newItem).unwrap();
			setDescription('');
			setLocation(null);
			setFileUrls([]);
			setPreviewUrls([]);
			closeModal();
			console.log('Post added successfully');
		} catch (error) {
			console.error('Error adding post:', error);
		}
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const handleOpenModal = () => {
		setModalFile(true);
	};

	const handleCloseModal = () => {
		setModalFile(false);
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
					multiple
				/>
			</div>

			<ModalTs open={modalFile} onCancel={handleCloseModal}>
				<div>
					<FilterContext.Provider value={value}>
						<Container sx={{ marginTop: '4rem', marginBottom: '4rem' }}>
							<Box sx={{ textAlign: 'center', marginBottom: '3rem' }}>
								<h1>Image Filter</h1>
							</Box>
							<Grid container spacing={10}>
								<ImageField />
								<Grid item xs={12} md={5}>
									<FilterTabs />
									{tabFilter === 'instaFilter' ? (
										<InstaFilter />
									) : (
										<CustomFilter />
									)}
								</Grid>
							</Grid>
						</Container>
					</FilterContext.Provider>
				</div>
			</ModalTs>

			<ModalTs open={isModal} onCancel={closeModal}>
				<div className={scss.bar_modal}>
					<div className={scss.is_modal}>
						<div className={scss.inputs}>
							<h3>Добавьте пост</h3>
							<input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								type="text"
								placeholder="Описание"
							/>
						</div>
						<div className={scss.buttons}>
							<button onClick={closeModal}>Отмена</button>
							<button onClick={handleAddPost}>Отправить</button>
						</div>
					</div>
				</div>
			</ModalTs>
		</div>
	);
};

export default Publications;
