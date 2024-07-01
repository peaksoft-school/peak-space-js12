import scss from './Chats.module.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Avatar } from 'antd';
import { ScrollArea } from '@mantine/core';
import { useGetChatUserQuery } from '@/src/redux/api/chat';

const Chats = () => {
	const { data: userChatData = [] } = useGetChatUserQuery();
	const { pathname } = useLocation();

	return (
		<section className={scss.Chats}>
			<div className={scss.container}>
				<div className={scss.content}>
					<ScrollArea w={'400px'} h={'90vh'}>
						<div className={scss.left}>
							{userChatData.map((item) => (
								<Link
									className={
										pathname === `/chat/${item.email}`
											? `${scss.user} ${scss.active}`
											: `${scss.user}`
									}
									key={item.id}
									to={`/chat/${item.email}`}
								>
									<Avatar
										size={38}
										icon={<img src={item?.avatar} alt="avatar" />}
									/>
									<div className={scss.name_message}>
										<h1 className={scss.name}>{item.userName}</h1>
										<p className={scss.message}>Сообщение скрыто</p>
									</div>
								</Link>
							))}
						</div>
					</ScrollArea>

					<div className={scss.right}>
						<Outlet />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Chats;
