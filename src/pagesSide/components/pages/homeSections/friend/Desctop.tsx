import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import GroupPage from './Group';
import Hashtag from './ Hashtag';
import Friend from './Friend';
import CustomButton from '@/src/ui/customButton/CustomButton';
import ModalTs from '@/src/ui/modal/Modal';
import search from '../../../../../assets/image.svg';
import scss from './Style.module.scss';

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
						<img src={search} alt="search" />
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
			</ModalTs>
		</div>
	);
};

export default Desctop;
