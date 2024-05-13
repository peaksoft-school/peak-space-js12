import ModalProject from '@/src/UI/modal/modal';
import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import scss from './Style.module.scss';
import GroupPage from './Group';
import Hashtag from './ Hashtag';
import CustomButton from '@/src/ui/customButton/CustomButton';
import Friend from './Friend';
import search from '../../../../../assets/image.svg';
const Desctop = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeItem, setActiveItem] = useState('/');
	const params = useParams();
	console.log(params);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleOk = () => {
		console.log('Ok clicked');
		handleCloseModal();
	};

	const handleCancel = () => {
		console.log('Cancel clicked');
		handleCloseModal();
	};
	return (
		<div>
			<CustomButton onClick={handleOpenModal}>Open Modal</CustomButton>

			<ModalProject
				className={scss.custom_modal}
				title=""
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className={scss.contentype}>
					<div className={scss.content}>
						<img src={search} alt="" />
						<input
							type="text"
							placeholder="Enter text"
							className={scss.inputText}
						/>
					</div>
					<div className={scss.param}>
						<Link
							className={`${activeItem === '/Friend' ? scss.activeStyle : scss.link}`}
							onClick={() => setActiveItem('/Friend')}
							to="/Friend"
						>
							Пользователи
						</Link>
						<Link
							className={`${activeItem === '/Group' ? scss.activeStyle : scss.link}`}
							onClick={() => setActiveItem('/Group')}
							to="/Group"
						>
							группа
						</Link>
						<Link
							className={`${activeItem === '/Hashtag' ? scss.activeStyle : scss.link}`}
							onClick={() => setActiveItem('/Hashtag')}
							to="/Hashtag"
						>
							хештег
						</Link>
					</div>
					<div className={scss.param}></div>
				</div>
				<Routes>
					<Route path="/Friend" element={<Friend />} />
					<Route path="/Group" element={<GroupPage />} />
					<Route path="/Hashtag" element={<Hashtag />} />
				</Routes>
			</ModalProject>
		</div>
	);
};

export default Desctop;
