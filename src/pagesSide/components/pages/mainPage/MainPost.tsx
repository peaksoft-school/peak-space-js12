import {
	Comments,
	Like,
	Point,
	Safe,
	SendIcon,
	Smile
} from '@/src/assets/icons';
import { useGetMainPageQuery } from '@/src/redux/api/mainPage';
import { useState } from 'react';
import scss from './Style.module.scss';
import ModalTs from '@/src/ui/modal/Modal';
import SliderMain from './SliderMain';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const MainPost = () => {
	const { data: items } = useGetMainPageQuery();
	const [isState, setIsState] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [inputStr, setInputStr] = useState('');
	const [showPicker, setShowPicker] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleGetEmoji = (event: any) => {
		setInputStr((prevInput) => prevInput + event.native);
		setShowPicker(false);
	};

	const changeState = () => {
		setIsState(!isState);
	};
	const openModal = () => {
		setIsModal(true);
	};
	const closeModal = () => {
		setIsModal(false);
	};

	return (
		<div>
			{items?.map((item) => (
				<div className={scss.section} key={item._id}>
					<div className={scss.holder}>
						<div className={scss.wrapper}>
							<div className={scss.wrap}>
								<img src={item.avatar} alt="" />
								<div>
									<h5>{item.nicname}</h5>
									<p>{item.localtion}</p>
								</div>
							</div>
							<button onClick={changeState}>
								<Point onClick={changeState} />
							</button>
						</div>
						<div
							className={isState ? scss.one : scss.two}
							onClick={changeState}
						>
							<p className={scss.red}>заблокировать пользователя</p>
							<p>Пожаловаться</p>
							<p>Отписаться</p>
						</div>
						<p className={scss.text}>{item.text}</p>
						<div className={scss.posts}>
							<img src={item.postImg} alt="" />
							<img src={item.secondPost} alt="" />
							<div className={scss.icons}>
								<div className={scss.inner}>
									<Like />
									<Comments onClick={openModal} />
									<SendIcon />
								</div>
								<div>
									<Safe />
								</div>
							</div>
						</div>
						<p className={scss.comment}>Добавить комментарий...</p>

						<ModalTs open={isModal} onCancel={closeModal}>
							<div className={scss.modal_aside}>
								<div className={scss.widget}>
									<SliderMain />
								</div>
								<div className={scss.main}>
									<div className={scss.excerpt}>
										<div className={scss.popup}>
											<div className={scss.bullet}>
												<img src={item.avatar} alt="" />
												<div>
													<h5>{item.nicname}</h5>
													<p>{item.localtion}</p>
												</div>
											</div>
											<Point onClick={closeModal} />
										</div>
										{/* comments */}
										<div className={scss.preview}>
											<img
												src="https://i.pinimg.com/564x/42/91/b4/4291b466ec6093fd98c40f213e17c8e6.jpg"
												alt=""
											/>
											<div className={scss.tip}>
												<p>_alina</p>
												<div className={scss.narrow}>
													<p>
														Lorem ipsum dolor sit amet, consectetur adipiscing
														elit, sed do eiusmod tempor incididunt ut labore et
														dolore magna aliqua. Ut enim ad minim veniam, quis
														nostrud exercitation ullamco laboris nisi ut aliquip
													</p>
													<button>
														<Like />
													</button>
												</div>
												<div className={scss.end_message}>
													<p>17:27 19.03.2024</p>
													<h5>Ответить</h5>
												</div>
											</div>
										</div>
									</div>
									{/* inputSmile */}
									<div className={scss.input_smile}>
										<Smile onClick={() => setShowPicker((val) => !val)} />
										<input
											type="text"
											placeholder="Добавить комментарий..."
											value={inputStr}
											onChange={(e) => setInputStr(e.target.value)}
										/>
										{showPicker && (
											<Picker
												data={data}
												onEmojiSelect={handleGetEmoji}
												theme={'light'}
											/>
										)}
									</div>
								</div>
							</div>
						</ModalTs>
					</div>
				</div>
			))}
		</div>
	);
};

export default MainPost;
