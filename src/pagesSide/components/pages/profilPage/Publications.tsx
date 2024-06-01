import { useEffect, useRef, useState } from 'react';
import {
	useCreatePostMutation,
	usePostCreateFileMutation,
	useGetGeocodeQuery
} from '@/src/redux/api/publications';
import scss from './Style.module.scss';
import ModalTs from '@/src/ui/modal/Modal';
import { PlusIconSecond } from '@/src/assets/icons';

const filterValues = [
	{ name: 'None', class: '' },
	{ name: '1977', class: 'filter-1977' },
	{ name: 'Aden', class: 'filter-aden' },
	{ name: 'Amaro', class: 'filter-amaro' },
	{ name: 'Ashby', class: 'filter-ashby' },
	{ name: 'Brannan', class: 'filter-brannan' },
	{ name: 'Brooklyn', class: 'filter-brooklyn' },
	{ name: 'Charmes', class: 'filter-charmes' },
	{ name: 'Clarendon', class: 'filter-clarendon' },
	{ name: 'Crema', class: 'filter-crema' },
	{ name: 'Dogpatch', class: 'filter-dogpatch' },
	{ name: 'Earlybird', class: 'filter-earlybird' },
	{ name: 'Gingham', class: 'filter-gingham' },
	{ name: 'Ginza', class: 'filter-ginza' },
	{ name: 'Hefe', class: 'filter-hefe' },
	{ name: 'Helena', class: 'filter-helena' },
	{ name: 'Hudson', class: 'filter-hudson' },
	{ name: 'Inkwell', class: 'filter-inkwell' },
	{ name: 'Kelvin', class: 'filter-kelvin' },
	{ name: 'Kuno', class: 'filter-juno' },
	{ name: 'Lark', class: 'filter-lark' },
	{ name: 'Lo-Fi', class: 'filter-lofi' },
	{ name: 'Ludwig', class: 'filter-ludwig' },
	{ name: 'Maven', class: 'filter-maven' },
	{ name: 'Mayfair', class: 'filter-mayfair' },
	{ name: 'Moon', class: 'filter-moon' },
	{ name: 'Nashville', class: 'filter-nashville' },
	{ name: 'Perpetua', class: 'filter-perpetua' },
	{ name: 'Poprocket', class: 'filter-poprocket' },
	{ name: 'Reyes', class: 'filter-reyes' },
	{ name: 'Rise', class: 'filter-rise' },
	{ name: 'Sierra', class: 'filter-sierra' },
	{ name: 'Skyline', class: 'filter-skyline' },
	{ name: 'Slumber', class: 'filter-slumber' },
	{ name: 'Stinson', class: 'filter-stinson' },
	{ name: 'Sutro', class: 'filter-sutro' },
	{ name: 'Toaster', class: 'filter-toaster' },
	{ name: 'Valencia', class: 'filter-valencia' },
	{ name: 'Vesper', class: 'filter-vesper' },
	{ name: 'Walden', class: 'filter-walden' },
	{ name: 'Willow', class: 'filter-willow' },
	{ name: 'X-Pro II', class: 'filter-xpro-ii' }
];

const Publications = () => {
	const [isModal, setIsModal] = useState(false);
	const [modalFile, setModalFile] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createFile] = usePostCreateFileMutation();
	const [postRequest] = useCreatePostMutation();
	const [fileUrls, setFileUrls] = useState<string[]>([]);
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [selectedFilter, setSelectedFilter] = useState<string>(
		filterValues[0].class
	);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

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
				const response: any = await createFile(formData as any).unwrap();
				newFileUrls.push(response);
				setFileUrls(newFileUrls);
				setPreviewImage(URL.createObjectURL(file));
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
		imageElement.onload = async () => {
			const filteredImage = applyFilter(selectedFilter, imageElement);
			if (filteredImage) {
				const response: any = await createFile(
					dataURLToBlob(filteredImage) as any
				).unwrap();
				setFileUrls([response]);

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
					setPreviewImage(null);
					closeModal();
					console.log('Post added successfully');
				} catch (error) {
					console.error('Error adding post:', error);
				}
			}
		};
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	const handleOpenModal = () => {
		setIsModal(false);
		setModalFile(true);
	};

	const handleCloseModal = () => {
		setModalFile(false);
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

			<ModalTs open={modalFile} onCancel={handleCloseModal}>
				<div>
					<div className={scss.buttons}>
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
						<button onClick={closeModal}>Отмена</button>
						<button onClick={handleAddPost}>Отправить</button>
						<div className={scss.inputs}>
							<h3>Добавьте пост</h3>
							<input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								type="text"
								placeholder="Описание"
							/>
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
									<div className={scss.filter}>
										<img
											key={filter.class}
											src={previewImage || ''}
											alt={filter.name}
											className={`${scss.filterPreview} ${scss[filter.class]}`}
											onClick={() => setSelectedFilter(filter.class)}
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

// 2

// import { useEffect, useRef, useState } from 'react';
// import {
// 	useCreatePostMutation,
// 	usePostCreateFileMutation,
// 	useGetGeocodeQuery
// } from '@/src/redux/api/publications';
// import scss from './Style.module.scss';
// import ModalTs from '@/src/ui/modal/Modal';
// import { PlusIconSecond } from '@/src/assets/icons';

// const filterValues = [
// 	{ name: 'None', class: '' },
// 	{ name: '1977', class: 'filter-1977' },
// 	{ name: 'Aden', class: 'filter-aden' },
// 	{ name: 'Amaro', class: 'filter-amaro' },
// 	{ name: 'Ashby', class: 'filter-ashby' },
// 	{ name: 'Brannan', class: 'filter-brannan' },
// 	{ name: 'Brooklyn', class: 'filter-brooklyn' },
// 	{ name: 'Charmes', class: 'filter-charmes' },
// 	{ name: 'Clarendon', class: 'filter-clarendon' },
// 	{ name: 'Crema', class: 'filter-crema' },
// 	{ name: 'Dogpatch', class: 'filter-dogpatch' },
// 	{ name: 'Earlybird', class: 'filter-earlybird' },
// 	{ name: 'Gingham', class: 'filter-gingham' },
// 	{ name: 'Ginza', class: 'filter-ginza' },
// 	{ name: 'Hefe', class: 'filter-hefe' },
// 	{ name: 'Helena', class: 'filter-helena' },
// 	{ name: 'Hudson', class: 'filter-hudson' },
// 	{ name: 'Inkwell', class: 'filter-inkwell' },
// 	{ name: 'Kelvin', class: 'filter-kelvin' },
// 	{ name: 'Kuno', class: 'filter-juno' },
// 	{ name: 'Lark', class: 'filter-lark' },
// 	{ name: 'Lo-Fi', class: 'filter-lofi' },
// 	{ name: 'Ludwig', class: 'filter-ludwig' },
// 	{ name: 'Maven', class: 'filter-maven' },
// 	{ name: 'Mayfair', class: 'filter-mayfair' },
// 	{ name: 'Moon', class: 'filter-moon' },
// 	{ name: 'Nashville', class: 'filter-nashville' },
// 	{ name: 'Perpetua', class: 'filter-perpetua' },
// 	{ name: 'Poprocket', class: 'filter-poprocket' },
// 	{ name: 'Reyes', class: 'filter-reyes' },
// 	{ name: 'Rise', class: 'filter-rise' },
// 	{ name: 'Sierra', class: 'filter-sierra' },
// 	{ name: 'Skyline', class: 'filter-skyline' },
// 	{ name: 'Slumber', class: 'filter-slumber' },
// 	{ name: 'Stinson', class: 'filter-stinson' },
// 	{ name: 'Sutro', class: 'filter-sutro' },
// 	{ name: 'Toaster', class: 'filter-toaster' },
// 	{ name: 'Valencia', class: 'filter-valencia' },
// 	{ name: 'Vesper', class: 'filter-vesper' },
// 	{ name: 'Walden', class: 'filter-walden' },
// 	{ name: 'Willow', class: 'filter-willow' },
// 	{ name: 'X-Pro II', class: 'filter-xpro-ii' }
// ];

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
// 	const [selectedFilter, setSelectedFilter] = useState<string>(
// 		filterValues[0].class
// 	);
// 	const [previewImage, setPreviewImage] = useState<string | null>(null);

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
// 		if (files && files[0]) {
// 			const file = files[0];
// 			const newFileUrls: string[] = [];
// 			const formData = new FormData();
// 			formData.append('file', file);

// 			try {
// 				const response: any = await createFile(formData as any).unwrap();
// 				newFileUrls.push(response);
// 				setFileUrls(newFileUrls);
// 				setPreviewImage(URL.createObjectURL(file));
// 				openModal();
// 			} catch (error) {
// 				console.error('Error uploading file:', error);
// 			}
// 		}
// 	};

// 	const applyFilter = (filterClass: string, image: HTMLImageElement) => {
// 		const canvas = document.createElement('canvas');
// 		const ctx = canvas.getContext('2d');
// 		if (ctx) {
// 			canvas.width = image.width;
// 			canvas.height = image.height;
// 			ctx.filter = getComputedStyle(document.documentElement).getPropertyValue(
// 				`--${filterClass}`
// 			);
// 			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
// 			return canvas.toDataURL('image/png');
// 		}
// 		return null;
// 	};

// 	const handleAddPost = async () => {
// 		const imageElement = document.createElement('img');
// 		imageElement.src = previewImage || '';
// 		imageElement.onload = async () => {
// 			const filteredImage = applyFilter(selectedFilter, imageElement);
// 			if (filteredImage) {
// 				const response: any = await createFile(
// 					dataURLToBlob(filteredImage) as any
// 				).unwrap();
// 				setFileUrls([response]);

// 				const newItem = {
// 					links: fileUrls,
// 					description: description,
// 					location: locationString || 'Unknown location',
// 					blockComment: true
// 				};

// 				try {
// 					await postRequest(newItem).unwrap();
// 					setDescription('');
// 					setLocation(null);
// 					setFileUrls([]);
// 					setPreviewImage(null);
// 					handleCloseModalFile();
// 					console.log('Post added successfully');
// 				} catch (error) {
// 					console.error('Error adding post:', error);
// 				}
// 			}
// 		};
// 	};

// 	const openModal = () => {
// 		setIsModal(true);
// 	};

// 	const closeModal = () => {
// 		setIsModal(false);
// 	};

// 	const handleOpenModalFile = () => {
// 		closeModal(); // Закрываем первый модальный диалог
// 		setModalFile(true);
// 	};

// 	const handleCloseModalFile = () => {
// 		setModalFile(false);
// 	};

// 	const dataURLToBlob = (dataurl: string) => {
// 		const arr = dataurl.split(',');
// 		const mime = arr[0].match(/:(.*?);/)[1];
// 		const bstr = atob(arr[1]);
// 		let n = bstr.length;
// 		const u8arr = new Uint8Array(n);
// 		while (n--) {
// 			u8arr[n] = bstr.charCodeAt(n);
// 		}
// 		return new Blob([u8arr], { type: mime });
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
// 				/>
// 			</div>

// 			<ModalTs open={modalFile} onCancel={handleCloseModalFile}>
// 				<div>
// 					<div className={scss.buttons}>
// 						{previewImage && (
// 							<img
// 								style={{
// 									maxWidth: '640px',
// 									height: '581.6px',
// 									objectFit: 'cover',
// 									borderRadius: '5px'
// 								}}
// 								src={previewImage}
// 								alt="Preview"
// 								className={scss[selectedFilter]}
// 							/>
// 						)}
// 						<button onClick={handleCloseModalFile}>Отмена</button>
// 						<button onClick={handleAddPost}>Отправить</button>
// 						<div className={scss.inputs}>
// 							<h3>Добавьте пост</h3>
// 							<input
// 								value={description}
// 								onChange={(e) => setDescription(e.target.value)}
// 								type="text"
// 								placeholder="Описание"
// 							/>
// 						</div>
// 					</div>
// 				</div>
// 			</ModalTs>

// 			<ModalTs open={isModal} onCancel={closeModal}>
// 				<div className={scss.bar_modal}>
// 					<div className={scss.is_modal}>
// 						<div className={scss.header_modal}>
// 							<p>Редактировать</p>
// 							<h4 onClick={handleOpenModalFile}>Далее</h4>
// 						</div>
// 						<div className={scss.second_}>
// 							<div className={scss.imagePreview}>
// 								{previewImage && (
// 									<img
// 										style={{
// 											maxWidth: '640px',
// 											height: '581.6px',
// 											objectFit: 'cover',
// 											borderRadius: '5px'
// 										}}
// 										src={previewImage}
// 										alt="Preview"
// 										className={scss[selectedFilter]}
// 									/>
// 								)}
// 							</div>
// 							<div className={scss.filterSelection}>
// 								{filterValues.map((filter) => (
// 									<div key={filter.class} className={scss.filter}>
// 										<img
// 											src={previewImage || ''}
// 											alt={filter.name}
// 											className={`${scss.filterPreview} ${scss[filter.class]}`}
// 											onClick={() => setSelectedFilter(filter.class)}
// 										/>
// 										<p>{filter.name}</p>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</ModalTs>
// 		</div>
// 	);
// };

// export default Publications;
