import {
	// ArrowLeft,
	// ArrowRight,
	Comments,
	Like,
	Point,
	Safe,
	SendIcon,
	Smile
} from '@/src/assets/icons';
import { useGetMainPageQuery } from '@/src/redux/api/mainPage';
import scss from './MainPage.module.scss';
import { useState } from 'react';
import Modal from '@/src/UI/Modal/Modal';
import { useKeenSlider } from 'keen-slider/react';

const MainPost = () => {
	const { data, isLoading } = useGetMainPageQuery();
	const [isState, setIsState] = useState(false);
	const [isModal, setIsModal] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		}
	});
	const changeState = () => {
		setIsState(!isState);
	};
	const openModal = () => {
		setIsModal(true);
	};
	const closeModal = () => {
		setIsModal(false);
	};
	// sllider

	function Arrow(props: {
		disabled: boolean;
		left?: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onClick: (e: any) => void;
	}) {
		const disabled = props.disabled ? ' arrow--disabled' : '';
		return (
			<svg
				onClick={props.onClick}
				className={`arrow ${
					props.left ? 'arrow--left' : 'arrow--right'
				} ${disabled}`}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
			>
				{props.left && (
					<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
				)}
				{!props.left && (
					<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
				)}
			</svg>
		);
	}

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
							<Point onClick={changeState} />
						</div>
						<div
							className={isState ? scss.one : scss.two}
							onClick={changeState}
						>
							<p>Не интересно</p>
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
									<Comments />
									<SendIcon />
								</div>
								<div>
									<Safe />
								</div>
							</div>
						</div>
						<p onClick={openModal} className={scss.comment}>
							Добавить комментарий...
						</p>
						<Modal isOpen={isModal} onClose={closeModal}>
							<div className={scss.modalAside}>
								<div className={scss.widget}>
									{isLoading ? (
										<>
											<p>Loading . .</p>
										</>
									) : (
										<>
											<div ref={sliderRef} className="keen-slider">
												{/* <img src={item.secondPost} alt="" />
												<img src={item.postImg} alt="" /> */}

												<div className="keen-slider__slide number-slide1">
													1
												</div>
												<div className="keen-slider__slide number-slide2">
													2
												</div>
												<div className="keen-slider__slide number-slide3">
													3
												</div>
												<div className="keen-slider__slide number-slide4">
													4
												</div>
												<div className="keen-slider__slide number-slide5">
													5
												</div>
												<div className="keen-slider__slide number-slide6">
													6
												</div>
											</div>
										</>
									)}
									{loaded && instanceRef.current && (
										<>
											<Arrow
												left
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												onClick={(e: any) =>
													e.stopPropagation() || instanceRef.current?.prev()
												}
												disabled={currentSlide === 0}
											/>

											<Arrow
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												onClick={(e: any) =>
													e.stopPropagation() || instanceRef.current?.next()
												}
												disabled={
													currentSlide ===
													instanceRef.current.track.details.slides.length - 1
												}
											/>
										</>
									)}
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
													<Like />
												</div>
												<div className={scss.endMessage}>
													<p>17:27 19.03.2024</p>
													<h5>Ответить</h5>
												</div>
											</div>
										</div>
									</div>
									{/* inputSmile */}
									<div className={scss.InputSmile}>
										<Smile />
										<input type="text" placeholder="Добавить комментарий..." />
									</div>
								</div>
							</div>
						</Modal>
					</div>
				</div>
			))}
		</div>
	);
};

export default MainPost;
