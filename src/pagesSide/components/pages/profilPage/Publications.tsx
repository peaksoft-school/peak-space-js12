import { useRef, useState } from 'react';
import {
	useGetPublicationsQuery,
	usePostPublicationsMutation
} from '@/src/redux/api/publications';
import scss from './Style.module.scss';
import { PlusIconSecond } from '@/src/assets/icons';

const Publications = () => {
	const [, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { data, isLoading } = useGetPublicationsQuery();
	const [postRequest] = usePostPublicationsMutation();

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			setHidePhoto(true);
			reader.onload = (e) => {
				if (e.target) {
					setImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleAddPhoto = async () => {
		try {
			let newData;
			if (
				fileInputRef.current &&
				fileInputRef.current.files &&
				fileInputRef.current.files.length > 0
			) {
				const file = fileInputRef.current.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target) {
						setImage(e.target.result as string);
					}
				};
				reader.readAsDataURL(file);
				newData = {
					img: image
				};
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				await postRequest(newData as any).unwrap();
			} else {
				return;
			}
			setImage('');
		} catch (error) {
			console.error('Error adding photo:', error);
		}
	};

	return (
		<div className={scss.content}>
			{isLoading ? (
				<h1>Loading . . .</h1>
			) : (
				<>
					<div className={scss.bar}>
						<div onClick={handleButtonClick}>
							<PlusIconSecond />
							<p style={{ textAlign: 'center' }}>
								Добавить <br /> фото
							</p>
						</div>
					</div>
					{data?.map((item) => (
						<div className={scss.section} key={item.id}>
							<img src={item.img} alt="" />
						</div>
					))}
				</>
			)}

			<input
				placeholder="text"
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>

			<button onClick={handleAddPhoto}>Добавить фото</button>
		</div>
	);
};

export default Publications;

// !2
// import { useRef, useState } from 'react';
// import {
// 	useGetPublicationsQuery,
// 	usePostPublicationsMutation
// } from '@/src/redux/api/publications';
// import scss from './Style.module.scss';
// import { PlusIconSecond } from '@/src/assets/icons';

// const Publications = () => {
// 	const [image, setImage] = useState<string>('');
// 	const { data, isLoading } = useGetPublicationsQuery();
// 	const fileInputRef = useRef<HTMLInputElement>(null);
// 	const [postRequest] = usePostPublicationsMutation();

// 	const handleButtonClick = () => {
// 		if (fileInputRef.current) {
// 			fileInputRef.current.click();
// 		}
// 	};

// 	const handleFileChange = async (
// 		event: React.ChangeEvent<HTMLInputElement>
// 	) => {
// 		const file = event.target.files?.[0];
// 		if (file) {
// 			const reader = new FileReader();
// 			reader.onload = async (e) => {
// 				if (e.target) {
// 					const imageDataUrl = e.target.result as string;
// 					setImage(imageDataUrl);
// 					const formData = new FormData();
// 					formData.append('img', file);
// 					await postRequest(formData).unwrap();
// 				}
// 			};
// 			reader.readAsDataURL(file);
// 		}
// 	};

// 	return (
// 		<div className={scss.content}>
// 			{isLoading ? (
// 				<h1>Loading . . .</h1>
// 			) : (
// 				<>
// 					<div className={scss.bar} onClick={handleButtonClick}>
// 						<label>
// 							<PlusIconSecond />
// 							<p style={{ textAlign: 'center' }}>
// 								Добавить <br /> фото
// 							</p>
// 						</label>
// 						<input
// 							type="file"
// 							ref={fileInputRef}
// 							style={{ display: 'none' }}
// 							onChange={handleFileChange}
// 						/>
// 					</div>

// 					{data?.map((item) => (
// 						<div className={scss.section} key={item.id}>
// 							<img src={item.img} alt="" />
// 						</div>
// 					))}
// 				</>
// 			)}
// 		</div>
// 	);
// };

// export default Publications;
