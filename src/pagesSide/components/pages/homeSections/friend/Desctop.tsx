import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import scss from './Style.module.scss';
import GroupPage from './Group';
import Hashtag from './ Hashtag';
import CustomButton from '@/src/ui/customButton/CustomButton';
import Friend from './Friend';
import search from '../../../../../assets/image.svg';
import ModalTs from '@/src/ui/modal/Modal';

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

	const handleCancel = () => {
		console.log('Cancel clicked');
		handleCloseModal();
	};
	return (
		<div>
			<CustomButton onClick={handleOpenModal}>Open Modal</CustomButton>

			<ModalTs open={isModalOpen} onCancel={handleCancel}>
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
							className={`${activeItem === '/friend' ? scss.activeStyle : scss.link}`}
							onClick={() => setActiveItem('/friend')}
							to="/friend"
						>
							Пользователи
						</Link>
						<Link
							className={`${activeItem === '/group' ? scss.activeStyle : scss.link}`}
							onClick={() => setActiveItem('/group')}
							to="/group"
						>
							группа
						</Link>
						<Link
							className={`${activeItem === '/hashtag' ? scss.activeStyle : scss.link}`}
							onClick={() => setActiveItem('/hashtag')}
							to="/hashtag"
						>
							хештег
						</Link>
					</div>
					<div className={scss.param}></div>
				</div>
				<Routes>
					<Route path="/friend" element={<Friend />} />
					<Route path="/group" element={<GroupPage />} />
					<Route path="/hashtag" element={<Hashtag />} />
				</Routes>
			</ModalTs>
		</div>
	);
};

export default Desctop;
