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
import ModalTs from '@/src/UI/Modal/Modal';
import SliderMain from './SliderMain';

const MainPost = () => {
	const { data } = useGetMainPageQuery();
	const [isState, setIsState] = useState(false);
	const [isModal, setIsModal] = useState(false);

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
			{data?.map((item) => (
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
								<Point />
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
												src="https://s3-alpha-sig.figma.com/img/8362/89d6/df84eab2ac2d1f2d0f1dcd527f30304d?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=itGFHD8ViNM3gRtya1RJUxyRbAIALEaij237pOBWhesENyx7lZiVlC2z5aEc7x9SDkkBoGnzH04DppT4WfL19oQ~~9H9M4VuPLe77XlFJLTP7zAysaBDd2xV8dU0VSP1G9w1KhfN0LkXOA3Rrgps6fBhFnl17U8hDrA6JJBHI~zapbNx0iTZsff7yhRFdBqwp~IXkFReGanIMpvsOH5SiI1DAT48yvxPhiwkBaD24tyj4jcyhytlwzzVFK4SHzitt2r6-OjimF4HTGpAPuSHpEUL1BXIq~jfyBNiqKEp9gRk1ETVrrXhJlwXPun9eP5g3F7PqzJZa1lS1GTxwJyUfw__"
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
										<Smile />
										<input type="text" placeholder="Добавить комментарий..." />
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
