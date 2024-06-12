/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
	useEditGetQuery,
	useGetGeocodeQuery,
	usePatchPostMutation
} from '@/src/redux/api/publications';
import { useNavigate, useParams } from 'react-router-dom';
import scss from './PostById.module.scss';
import { IconDots, IconEdit } from '@tabler/icons-react';

interface Edit {
	postId: number;
	userId: number;
	avatar: string;
	userName: string;
	location: string;
	description: string;
	countLikes: number;
	links: any[];
}

const PostById = () => {
	const { postId } = useParams();

	const { data: postData } = useEditGetQuery(postId as any);
	const [post, setPost] = useState<Edit>(null as any);
	const [patchPost] = usePatchPostMutation();

	const [isEdit, setIsEdit] = useState(null);
	const [editDescription, setEditDescription] = useState('');
	const [editLocation, setEditLocation] = useState('');
	const [isMessage, setIsMessage] = useState(false);
	const [location, setLocation] = useState({
		latitude: null,
		longitude: null
	});
	const { data: locationString } = useGetGeocodeQuery(location, {
		skip: !location.latitude || !location.longitude
	});

	const navigate = useNavigate();

	useEffect(() => {
		if (postData) {
			setPost(postData as any);
		}
	}, [postData]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setLocation({ latitude, longitude });
				},
				(error) => {
					console.error('Error getting location:', error);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	}, []);

	const editPost = (item: any) => {
		setEditDescription(item.description);
		setEditLocation(item.location);
		setIsEdit(item.postId);
		setIsMessage(false);
	};

	const savePost = async (id: number) => {
		const newData = {
			description: editDescription,
			location: editLocation
		};
		await patchPost({ id, newData });
		setIsEdit(null);
	};

	const Message = () => {
		setIsMessage(!isMessage);
		console.log('nurs');
	};

	return (
		<div className={scss.Test}>
			<div className={scss.header}>
				<button onClick={() => navigate(-1)}>назад</button>

				<h1>Подробности публикации</h1>
				<button onClick={Message}>
					<IconDots />
				</button>

				<div className={isMessage ? scss.is_work : scss.is_none}>
					<div className={scss.edit_pen} onClick={() => editPost(post)}>
						<IconEdit />
						<p>редактировать</p>
					</div>
				</div>
			</div>
			{!post ? (
				<p>Loading...</p>
			) : (
				<div key={post.postId}>
					{isEdit === post.postId ? (
						<>
							<div className={scss.edit}>
								<div className={scss.some}>
									<div className={scss.texts}>
										<div className={scss.text}>
											<textarea
												value={editDescription}
												onChange={(e) => setEditDescription(e.target.value)}
											></textarea>
										</div>
										<div className={scss.text}>
											<input
												value={editLocation}
												onChange={(e) => setEditLocation(e.target.value)}
											/>
										</div>
									</div>
									<div className={scss.user_name}>
										<img src={post.avatar} alt={`${post.userName}'s avatar`} />
										<p>{post.userName}</p>
									</div>
									<div>
										<p>Likes: {post.countLikes}</p>
										<div className={scss.buttons}>
											<button onClick={() => savePost(post.postId)}>
												Сохранить
											</button>
											<button onClick={() => setIsEdit(null)}>Отменить</button>
										</div>

										{post.links.map((link) => (
											<div className={scss.user_photo} key={link.id}>
												<img src={link.link} alt="" />
											</div>
										))}
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className={scss.some}>
								<div className={scss.texts}>
									<div className={scss.text}>
										<p>Описание:</p>
										<h2>{post.description}</h2>
									</div>
									<div className={scss.text}>
										<p>Mестоположение:</p>
										<h2>{post.location}</h2>
									</div>
								</div>
								<div className={scss.user_name}>
									<img src={post.avatar} alt={`${post.userName}'s avatar`} />
									<p>{post.userName}</p>
								</div>
								<p>Likes: {post.countLikes}</p>
								<div>
									{post.links.map((link) => (
										<div className={scss.user_photo} key={link.id}>
											<img src={link.link} alt="" />
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default PostById;
