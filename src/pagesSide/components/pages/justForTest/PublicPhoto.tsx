/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useGetGeocodeQuery,
	usePostCreateFileMutation
} from '@/src/redux/api/publications';
import {
	useGetPublicPhotosQuery,
	usePostPublicByIdMutation
} from '@/src/redux/api/userPublic';
import { useRef, useState, useEffect } from 'react';
import scss from './ForMe.module.scss';
import { useParams } from 'react-router-dom';
import { PlusIconSecond } from '@/src/assets/icons';
import { Switch } from 'antd';
import ModalTs from '@/src/ui/modal/Modal';
const PublicPhoto = () => {
	const { communityId } = useParams();
	const { data: photo } = useGetPublicPhotosQuery(communityId as any);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [showMessageIs, setShowMessageIs] = useState<any>({});
	const [fileUrls, setFileUrls] = useState<string[]>([]);
	const [description, setDescription] = useState('');
	const [ellipsis, setEllipsis] = useState(true);
	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [isModal, setIsModal] = useState(false);
	const [postRequest] = usePostPublicByIdMutation();

	const [createFile] = usePostCreateFileMutation();
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFilePhoto = async (
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
				openModal();
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const handleAddPublic = async (communityId: string | undefined) => {
		const newData = {
			links: fileUrls,
			description: description,
			location: locationString || 'is not found location',
			blockComment: ellipsis
		};
		try {
			await postRequest({ communityId, newData } as any).unwrap();
			closeModal();
			console.log('Публикация добавлена успешно');
		} catch (error) {
			console.error('Ошибка при добавлении публикации', error);
		}
	};

	const ShowMessageAgain = (id: any) => {
		setShowMessageIs((prevState: { [x: string]: string }) => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

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

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	return (
		<div>
			<div className={scss.down}>
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
						onChange={handleFilePhoto}
					/>
				</div>

				{photo?.map((item) => (
					<div key={item.id} className={scss.photos}>
						<img src={item.link} className={scss.image} alt="" />
						<button onClick={() => ShowMessageAgain(item.id)}>
							<IconDots />
						</button>
						<div
							className={
								showMessageIs[item.id] ? scss.showMessage : scss.isNotMessage
							}
						>
							<h4>удалить</h4>
						</div>
					</div>
				))}

				<ModalTs open={isModal} onCancel={closeModal}>
					<div className={scss.is_modal}>
						<div className={scss.modal}>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></textarea>

							<p>
								{ellipsis ? 'Выключить комментарии' : 'Включить комментарии'}
							</p>
							<Switch
								checked={ellipsis}
								onChange={() => {
									setEllipsis(!ellipsis);
								}}
							/>

							<button onClick={() => handleAddPublic(communityId)}>add</button>
						</div>
					</div>
				</ModalTs>
			</div>
		</div>
	);
};

export default PublicPhoto;
