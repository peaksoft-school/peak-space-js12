/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import scss from './PublicPage.module.scss';
import {
	useGetYuofollowQuery,
	useRecommendationGetQuery,
	useUserPublicmyCommunityQuery
} from '@/src/redux/api/userPublic';

// interface Types {
// 	cover: string;
// 	avatar: string;
// 	userName: string;
// 	tematica: string;
// 	publicId: number;
// 	pablicName: string;
// 	countFollower: number;
// 	descriptionPublic: string;
// }[];

const PublicPage = () => {
	const { data, isLoading, error } = useUserPublicmyCommunityQuery();
	const { data: users } = useRecommendationGetQuery();
	const { data: follow } = useGetYuofollowQuery();

	const [publics, setPublics] = useState<any[]>([]);

	const [activeItem, setActiveItem] = useState<string>('/');
	const navigate = useNavigate();

	useEffect(() => {
		if (data) {
			const transformedData = [
				{
					id: data.publicId,
					cover: data.cover,
					avatar: data.avatar,
					pablicName: data.pablicName,
					userName: data.userName,
					descriptionPublic: data.descriptionPublic,
					tematica: data.tematica,
					countFollower: data.countFollower
				}
			];
			setPublics(transformedData);
		}
	}, [data]);

	if (isLoading) {
		return <p>Загрузка данных...</p>;
	}

	if (error) {
		return <p>Ошибка загрузки данных</p>;
	}

	const navigateToMyPublic = (communityId: number) => {
		console.log(communityId, 'id');

		navigate(`/public/${communityId}`);
	};

	return (
		<>
			<div className={scss.container}>
				<div className={scss.content}>
					<div className={scss.head}>
						<div className={scss.empty_avatar}></div>
						<div className={scss.publics}>
							{publics.length === 0 ? (
								<>
									<p>У вас нет пабликов</p>
									<Link
										className={`${activeItem === '/new-public' ? scss.activePage : scss.newPublic}`}
										to="/new-public"
									>
										<button
											onClick={() => setActiveItem('/new-public')}
											className={scss.add_new_public_button}
										>
											Создать паблик
										</button>
									</Link>
								</>
							) : (
								publics.map((item) => (
									<div
										key={item.id}
										className={scss.public_item}
										onClick={() => (
											navigateToMyPublic(item.id), console.log(item.id)
										)}
									>
										<div className={scss.cover}>
											<img
												src={item.cover}
												className={
													item.cover && item.cover.length > 0
														? scss.have
														: scss.none
												}
												alt=""
											/>
										</div>
										<div className={scss.bar}>
											<div className={scss.user_img}>
												<img
													src={item.avatar}
													className={
														item.avatar && item.avatar.lenth > 0
															? scss.none_avata
															: scss.have_avatar
													}
													alt="avatar"
												/>
											</div>
											<div className={scss.side_bar}>
												<div className={scss.start}>
													<div className={scss.bar_aside}>
														<h4>{item.pablicName}</h4>
														<span></span>
														<p>{item.userName}</p>
													</div>
													<h4>{item.descriptionPublic}</h4>
													<p>{item.tematica}</p>
												</div>
												<div className={scss.end}>
													<div>
														<h4>{item.countFollower}</h4>
														<p>участников</p>
													</div>
													{/* <button>Присоединиться</button> */}
												</div>
											</div>
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
				<div className={scss.down}>
					<div className={scss.second}>
						{follow?.map((item) => (
							<div>
								<div className={scss.users}>
									<div>
										<img
											src={item.cover}
											className={item.cover ? scss.have : scss.none}
											alt=""
										/>
									</div>
									<div className={scss.bar}>
										<div className={scss.user_img}>
											<img
												className={item.avatar ? scss.is_have : scss.is_none}
												src={
													item.avatar
														? 'https://t3.ftcdn.net/jpg/05/55/88/54/360_F_555885464_kUchAI1oojmz0DvY90cTyuB0kJakCIaQ.jpg'
														: item.avatar
												}
												alt="UserAvatar"
											/>
										</div>
										<div className={scss.side_bar}>
											<div className={scss.start}>
												<div className={scss.bar_aside}>
													<h4>{item.pablicName}</h4>
													<span></span>
													<p>{item.userName}</p>
												</div>
												<h4>{item.descriptionPublic}</h4>
												<p>{item.tematica}</p>
											</div>
											<div className={scss.end}>
												<div>
													<h4>{item.countFollower}</h4>
													<p>участников</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={scss.second}>
						<h1>рекомендация</h1>
						{users?.map((el) => (
							<>
								<div className={scss.users}>
									<div>
										<img
											src={el.cover}
											className={el.cover ? scss.have : scss.none}
											alt=""
										/>
									</div>
									<div className={scss.bar}>
										<div className={scss.user_img}>
											<img
												className={el.avatar ? scss.is_have : scss.is_none}
												src={
													el.avatar
														? 'https://t3.ftcdn.net/jpg/05/55/88/54/360_F_555885464_kUchAI1oojmz0DvY90cTyuB0kJakCIaQ.jpg'
														: el.avatar
												}
												alt="UserAvatar"
											/>
										</div>
										<div className={scss.side_bar}>
											<div className={scss.start}>
												<div className={scss.bar_aside}>
													<h4>{el.pablicName}</h4>
													<span></span>
													<p>{el.userName}</p>
												</div>
												<h4>{el.descriptionPublic}</h4>
												<p>{el.tematica}</p>
											</div>
											<div className={scss.end}>
												<div>
													<h4>{el.countFollower}</h4>
													<p>участников</p>
												</div>
												<button>Присоединиться</button>
											</div>
										</div>
									</div>
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default PublicPage;
