import { useGetUsersQuery } from '@/src/redux/api/chat';
import scss from './Style.module.scss';
import { IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
const ChatMessage = () => {
	const { data, isLoading } = useGetUsersQuery();
	const navigate = useNavigate();
	const chatPerson = () => {
		navigate('/chatperson');
	};
	return (
		<div className={scss.chat_meg}>
			{isLoading ? (
				<h1>Loading........</h1>
			) : (
				<>
					<div className={scss.input_text}>
						<p>Сообщения</p>
						<div className={scss.inputs}>
							<IconSearch color=" #818C99" className={scss.icons} />
							<input type="text" placeholder="Поиск" />
						</div>
					</div>
					<div className={scss.box}>
						{data?.map((item) => (
							<div className={scss.aside} key={item.id}>
								<div className={scss.form}>
									<img className={scss.images} src={item.img} alt={item.name} />
									<div className={scss.text}>
										<h1 onClick={chatPerson}>{item.name}</h1>
										<p>{item.text}</p>
									</div>
								</div>
								<p>{item.title}</p>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};
export default ChatMessage;
