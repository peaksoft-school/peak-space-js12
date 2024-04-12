import scss from './EditProfilePage.module.scss';
import { useRef, useState } from 'react';
import backgroundsWhite from '../../../../assets/backWhite.jpeg';
import CustomSelect from '@/src/UI/customSelect/CustomSelect';
import Camera from '@/src/assets/icons/Camera';
import EditImg from '@/src/assets/icons/EditImg';
import {
	useGetEditQuery,
	usePatchEditMutation
} from '@/src/redux/api/editPage';
import UserEditProfile from '@/src/UI/userImages/UserEditProfile';

const EditProfilePage = () => {
	const { data, isLoading } = useGetEditQuery();
	// const [update] = usePatchEditMutation();
	// const [isEdit, setIsEdit] = useState<null | boolean>(false);
	// const [userImg, setUserImg] = useState('');
	// const fileInputRef = useRef<HTMLInputElement>(null);
	// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = event.target.files ? event.target.files[0] : null;
	// 	if (file) {
	// 		const reader = new FileReader();
	// 		reader.onload = (e) => {
	// 			if (e.target) {
	// 				setUserImg(e.target.result as string);
	// 			}
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };

	// const edit = (item: any) => {
	// 	setUserImg(item.img);
	// 	setIsEdit(item.id);
	// 	if (fileInputRef.current) {
	// 		fileInputRef.current.click();
	// 	}
	// };

	// const saveImg = (id: number | string) => {
	// 	const newImg = {
	// 		id,
	// 		img: userImg
	// 	};
	// 	update({ id, newImg })
	// 		.unwrap()
	// 		.then(() => {
	// 			setIsEdit(null);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Failed to save image:', error);
	// 		});
	// };

	return (
		<div className={scss.section}>
			<div className={scss.navbar}>
				<nav>
					<ul>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</nav>
			</div>
			<div className={scss.content}>
				<div className={scss.head}>
					<img className={scss.backgroundImg} src={backgroundsWhite} alt="" />

					<div>
						{data &&
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							data.map((item: any) => (
								<div className={scss.editImg} key={item.id}>
									<UserEditProfile />
									<></>
									{/* <>
										<input
											type="file"
											ref={fileInputRef}
											onChange={handleFileChange}
										/>
										<button onClick={() => saveImg(item.id)}>Save</button>
										<button onClick={() => setIsEdit(null)}>Cancel</button>
									</>

									<>
										<img src={item.img} alt="" />
										<Camera
											className={scss.cameraImg}
											onClick={() => edit(item)}
										/>
										<button className={scss.editPen} onClick={() => edit(item)}>
											<EditImg onClick={() => edit(item)} />
											Change Cover
										</button>
									</> */}
								</div>
							))}
					</div>

					<div className={scss.body}>
						<div className={scss.bar}>
							<p>Username</p>
							<input type="text" placeholder="Ivanov Ivan" />
						</div>
						<div className={scss.bar}>
							<p>Full Name</p>
							<input type="text" placeholder="Ivanov Ivan Ivanovich" />
						</div>
						<div className={scss.bar}>
							<p>About Me</p>
							<textarea placeholder="Express yourself with your heart"></textarea>
						</div>
					</div>
				</div>
				<div className={scss.Secondary}>
					<div className={scss.widget}>
						<p className={scss.text}>Secondary Education</p>
						<div className={scss.inner}>
							<p>City</p>
							<CustomSelect />
						</div>
						<div className={scss.inner}>
							<p>School</p>
							<CustomSelect />
						</div>
					</div>
				</div>
				<div className={scss.Secondary}>
					<div className={scss.widget}>
						<p className={scss.text}>Higher Education</p>
						<div className={scss.inner}>
							<p>City</p>
							<CustomSelect />
						</div>
						<div className={scss.inner}>
							<p>University</p>
							<CustomSelect />
						</div>
					</div>
				</div>
				<div className={scss.grid}>
					<div className={scss.col}>
						<p className={scss.lead}>Position</p>
						<CustomSelect />
						<div className={scss.row}>
							<p style={{ fontWeight: 'bold', fontSize: '20px' }}>Status</p>
							<div className={scss.radio}>
								<input type="radio" /> <p>Employed</p>
							</div>
							<div className={scss.radio}>
								<input type="radio" /> <p>Unemployed</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfilePage;
