/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
	useEditGetQuery,
	usePatchPostMutation
} from '@/src/redux/api/publications';
import { useNavigate, useParams } from 'react-router-dom';
import scss from './PostById.module.scss';
import { IconDots, IconEdit } from '@tabler/icons-react';
import ModalTs from '@/src/ui/modal/Modal';
import CustomButton from '@/src/ui/customButton/CustomButton';
import { Input, Skeleton } from 'antd';
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

	const [isModal, setIsModal] = useState(false);

	const navigate = useNavigate();

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};

	useEffect(() => {
		if (postData) {
			setPost(postData as any);
		}
	}, [postData]);

	const { TextArea } = Input;

	const editPost = (item: any) => {
		setEditDescription(item.description);
		setEditLocation(item.location);
		setIsEdit(item.postId);
		openModal();
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
				<div className={scss.error}>
					<Skeleton.Button active block />
				</div>
			) : (
				<div key={post.postId}>
					{isEdit === post.postId ? (
						<>
							<div className={scss.edit}>
								<ModalTs open={isModal} onCancel={closeModal}>
									<div className={scss.is_modal}>
										<div className={scss.modal}>
											<h2>редактировать публикацию</h2>

											<div className={scss.inputs}>
												<TextArea
													showCount
													maxLength={100}
													value={editDescription}
													onChange={(e) => setEditDescription(e.target.value)}
													placeholder="описание"
													style={{ height: 230, resize: 'none' }}
												/>

												<Input
													allowClear
													value={editLocation}
													onChange={(e) => setEditLocation(e.target.value)}
												/>
											</div>

											<div className={scss.buttons}>
												<CustomButton
													children={'Отменить'}
													onClick={() => setIsEdit(null)}
												/>
												<CustomButton
													children={'Сохранить'}
													onClick={() => savePost(post.postId)}
												/>
											</div>
										</div>
									</div>
								</ModalTs>
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
										<div className={scss.user_name}>
											<img
												src={post.avatar}
												alt={`${post.userName}'s avatar`}
											/>
											<p>{post.userName}</p>
										</div>
									</div>
									<div>
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
									<div className={scss.user_name}>
										<img src={post.avatar} alt={`${post.userName}'s avatar`} />
										<p>{post.userName}</p>
									</div>
								</div>
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
