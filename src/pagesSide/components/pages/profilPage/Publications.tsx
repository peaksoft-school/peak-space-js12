import { useEffect, useRef, useState } from 'react';
import {
	useCreatePostMutation,
	usePostCreateFileMutation,
	useGetGeocodeQuery
} from '@/src/redux/api/publications';
import scss from './Style.module.scss';
import ModalTs from '@/src/ui/modal/Modal';
import { PlusIconSecond } from '@/src/assets/icons';
const Publications = () => {
	const [isModal, setIsModal] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createFile] = usePostCreateFileMutation();
	const [postRequest] = useCreatePostMutation();
	const [fileUrls, setFileUrls] = useState<string[]>([]);
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
			openModal();
		}
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
					type="file"
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileChange}
					multiple
				/>
			</div>
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
