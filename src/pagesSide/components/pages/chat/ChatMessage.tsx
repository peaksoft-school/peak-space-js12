import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';
import { useGetUsersQuery } from '@/src/redux/api/chat';
import scss from './Style.module.scss';

const ChatMessage = () => {
	const navigate = useNavigate();

	const { data, isLoading } = useGetUsersQuery();

	const chatPerson = () => {
		navigate('/chat/chatperson');
	};

	return (
		<div className={scss.chat_meg}>
			<div className={scss.input_text}>
				<p>Сообщения</p>
				<div className={scss.inputs}>
					<IconSearch color=" #818C99" className={scss.icons} />
					<input type="text" placeholder="Поиск" />
				</div>
			</div>
			<div className={scss.box}>
				{isLoading ? (
					<>
						<h1>Loading.....</h1>
					</>
				) : (
					<>
						{data?.map((item) => (
							<div className={scss.aside} key={item.id} onClick={chatPerson}>
								<div className={scss.form}>
									<img className={scss.images} src={item.img} alt={item.name} />
									<div className={scss.text}>
										<h1>{item.name}</h1>
										<p>{item.text}</p>
									</div>
								</div>
								<p>{item.title}</p>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default ChatMessage;
