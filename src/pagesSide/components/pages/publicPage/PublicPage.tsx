// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import scss from './PublicPage.module.scss';

import {
	useGetYuofollowQuery,
	useJoinPublicByIdMutation,
	useRecommendationGetQuery,
	useUserPublicmyCommunityQuery
} from '@/src/redux/api/userPublic';
import { Skeleton, Tooltip } from 'antd';

const PublicPage = () => {
	const { data, isLoading, error, refetch } = useUserPublicmyCommunityQuery();
	const { data: users } = useRecommendationGetQuery();
	console.log(users);

	const { data: follow } = useGetYuofollowQuery();
	console.log(follow);

	const [putRequest] = useJoinPublicByIdMutation();

	const [publics, setPublics] = useState<any[]>([]);
	console.log(publics);

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
	console.log(data);

	if (isLoading) {
		return (
			<div className={scss.error}>
				<Skeleton active className={scss.custom_skeleton} />
				<Skeleton active className={scss.custom_skeleton} />
				<Skeleton active className={scss.custom_skeleton} />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<div
					style={{
						height: '100vh'
					}}
				>
					<h1
						style={{
							fontFamily: "'Courier New', Courier, monospace",
							fontWeight: 'bold',
							textAlign: 'center'
						}}
					>
						Ошибка загрузки данных
					</h1>
				</div>
			</div>
		);
	}

	const navigateToMyPublic = (communityId: number, event: React.MouseEvent) => {
		event.stopPropagation();

		navigate(`/public/${communityId}`);

		refetch();
	};

	const navigateUserPublic = (communityId: number, event: React.MouseEvent) => {
		event.stopPropagation();

		navigate(`/public/user-public/${communityId}`);

		refetch();
	};

	const JoinByUser = (publicId: number, event: React.MouseEvent) => {
		event.stopPropagation();

		if (publicId) {
			putRequest(publicId)
				.then((response) => {
					console.log('response:', response);
				})
				.catch((err) => {
					console.error('Error:', err);
				});
		} else {
			console.error('Invalid publicId:', publicId);
		}
		putRequest(publicId);
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
										onClick={(event) => navigateToMyPublic(item.id, event)}
										key={item.id}
										className={scss.public_item}
									>
										<div className={scss.cover}>
											<img
												src={
													item.cover && item.cover !== 'cover'
														? item.cover
														: 'https://s3-alpha-sig.figma.com/img/1c92/1bf5/b0093ed0ac29cf722c834434cf7ee611?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aRbcWs8eN-Mhny0ICI4GwKLx-LG7tHupNdjJBDCVlh37EbKJDndgV-0wSV8n0xq8OM-TEVcxPBLZMhjhy2C1~O1H2JnivHYvfFiLd8f4~KNWiFAE0eQMFjR3ROYnWqWASvOYYbWJ3tIuHScnYxKnlNZzjjQ71UfYzEjQNdRj1ecjFym1oI2wCHHRm-Qemi1VGm0kPLCnLZokRPxn9i8AM7SznezApo2HJlzd3v363puF6ylHtDDjwGSMgnpW2rSxKVyKz3utSjLTQRKy~mpnGsZbX4HRFovktCXL2aq9TiYvxvvHboBXhyz5aXbJzLt-WPGGp4rCyCdSTwL0fnntsA__'
												}
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
													src={
														item.avatar
															? item.avatar
															: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'
													}
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
													<h4
														style={{
															width: '100%',
															display: '-webkit-box',
															maxWidth: '250px',
															WebkitLineClamp: 1,
															WebkitBoxOrient: 'vertical',
															overflow: 'hidden',
															marginLeft: '-33px'
														}}
													>
														<Tooltip title={item.descriptionPublic}>
															{item.descriptionPublic}
														</Tooltip>
													</h4>
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
								))
							)}
						</div>
					</div>
				</div>
				<div className={scss.down}>
					<div className={scss.this_second}>
						{follow?.map((item) => (
							<div key={item.id} className={scss.second_2}>
								<div className={scss.cover}>
									<img
										onClick={(event) =>
											navigateUserPublic(item.publicId, event)
										}
										src={
											item.cover && item.cover !== 'cover'
												? item.cover
												: 'https://s3-alpha-sig.figma.com/img/1c92/1bf5/b0093ed0ac29cf722c834434cf7ee611?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aRbcWs8eN-Mhny0ICI4GwKLx-LG7tHupNdjJBDCVlh37EbKJDndgV-0wSV8n0xq8OM-TEVcxPBLZMhjhy2C1~O1H2JnivHYvfFiLd8f4~KNWiFAE0eQMFjR3ROYnWqWASvOYYbWJ3tIuHScnYxKnlNZzjjQ71UfYzEjQNdRj1ecjFym1oI2wCHHRm-Qemi1VGm0kPLCnLZokRPxn9i8AM7SznezApo2HJlzd3v363puF6ylHtDDjwGSMgnpW2rSxKVyKz3utSjLTQRKy~mpnGsZbX4HRFovktCXL2aq9TiYvxvvHboBXhyz5aXbJzLt-WPGGp4rCyCdSTwL0fnntsA__'
										}
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
											src={
												item.avatar && item.avatar !== 'avatar'
													? item.avatar
													: 'https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'
											}
											className={
												item.avatar ? scss.none_avata : scss.have_avatar
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
											<h4
												style={{
													width: '100%',
													display: '-webkit-box',
													maxWidth: '250px',
													WebkitLineClamp: 1,
													WebkitBoxOrient: 'vertical',
													overflow: 'hidden'
												}}
											>
												<Tooltip title={item.descriptionPublic}>
													{item.descriptionPublic}
												</Tooltip>
											</h4>
											<p>{item.tematica}</p>
										</div>
										<div className={scss.end}>
											<div>
												<h4>{item.countFollower}</h4>
												<p>участников</p>
											</div>
											<button
												onClick={(event) => JoinByUser(item.publicId, event)}
											>
												покинуть группу
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className={scss.some_users}>
						<h1 className={scss.my_community}>Рекомендация</h1>
						{users?.map((item) => (
							<>
								<div key={item.id} className={scss.third_3}>
									<div
										onClick={(event) => navigateToMyPublic(item.id, event)}
										key={item.id}
										className={scss.third_3}
									>
										<div className={scss.cover}>
											<img
												onClick={(event) => navigateToMyPublic(item.id, event)}
												src={
													item.cover && item.cover !== 'cover'
														? item.cover
														: 'https://s3-alpha-sig.figma.com/img/1c92/1bf5/b0093ed0ac29cf722c834434cf7ee611?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aRbcWs8eN-Mhny0ICI4GwKLx-LG7tHupNdjJBDCVlh37EbKJDndgV-0wSV8n0xq8OM-TEVcxPBLZMhjhy2C1~O1H2JnivHYvfFiLd8f4~KNWiFAE0eQMFjR3ROYnWqWASvOYYbWJ3tIuHScnYxKnlNZzjjQ71UfYzEjQNdRj1ecjFym1oI2wCHHRm-Qemi1VGm0kPLCnLZokRPxn9i8AM7SznezApo2HJlzd3v363puF6ylHtDDjwGSMgnpW2rSxKVyKz3utSjLTQRKy~mpnGsZbX4HRFovktCXL2aq9TiYvxvvHboBXhyz5aXbJzLt-WPGGp4rCyCdSTwL0fnntsA__'
												}
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
													src={
														item.avatar && item.avatar !== 'avatar'
															? item.avatar
															: 'https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png'
													}
													className={
														item.avatar && item.avatar.length > 0
															? scss.none_avata
															: scss.have_avatar
													}
													// alt="avatar"
												/>
											</div>
											<div className={scss.side_bar}>
												<div className={scss.start}>
													<div className={scss.bar_aside}>
														<h4>{item.pablicName}</h4>
														<span></span>
														<p>{item.userName}</p>
													</div>
													<h4
														style={{
															width: '100%',
															display: '-webkit-box',
															maxWidth: '250px',
															WebkitLineClamp: 1,
															WebkitBoxOrient: 'vertical',
															overflow: 'hidden'
														}}
													>
														<Tooltip title={item.descriptionPublic}>
															{item.descriptionPublic}
														</Tooltip>
													</h4>
													<p>{item.tematica}</p>
												</div>
												<div className={scss.end}>
													<div>
														<h4>{item.countFollower}</h4>
														<p>участников</p>
													</div>
													<button
														onClick={(event) =>
															JoinByUser(item.publicId, event)
														}
													>
														Присоединиться
													</button>
												</div>
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
