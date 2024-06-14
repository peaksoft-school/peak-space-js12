import { useState } from 'react';
import {
	useGetBlockedUsersQuery,
	usePutBlockedUsersMutation
} from '@/src/redux/api/blocked';
import ConfidentPage from './ConfidentPage';
import ModalTs from '@/src/ui/modal/Modal';
import scss from './Style.module.scss';

const BlockedPages = () => {
	const { data, isLoading } = useGetBlockedUsersQuery();
	console.log(data);
	
	const [isModal, setIsModal] = useState(false);
	const [putBlockedUsers] = usePutBlockedUsersMutation();

	const handlePutUsers = async (userId: number) => {
		await putBlockedUsers({ userId });
		setIsModal(false);
	};

	const openModal = () => {
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
	};
	return (
		<div className={scss.blocked}>
			<div>
				<ConfidentPage />
			</div>
			<div className={scss.contents}>
				<div>
					<h2>Заблокированные аккаунты</h2>
				</div>
				<div>
					<h3>Вы всегда можете блокировать людей из их профиля.</h3>
				</div>

				{isLoading ? (
					<h1>Loading.....</h1>
				) : (
					<>
						{data?.map((item) => (
							<>
								<div key={item.id} className={scss.card}>
									<div className={scss.start}>
										<img src={item.avatar} alt={item.userName} />
										<div className={scss.text}>
											<h3>{item.userName}</h3>
											<p>{item.lastName}</p>
										</div>
									</div>
									<button onClick={openModal}>Разблокировать</button>
								</div>
								<ModalTs open={isModal} onCancel={closeModal}>
									<div className={scss.modals}>
										<div className={scss.text}>
											<div>
												<h1> {item.userName}</h1>
											</div>
											<div>
												<p>
													Теперь {item.userName} сможет отправить вам запрос на
													подписку и обмен сообщениями в Instagram. Он/она не
													узнает, что вы его/ее разблокировали.
												</p>
											</div>
										</div>
										<div className={scss.buttons}>
											<button
												className={scss.button1}
												onClick={() => handlePutUsers(item.id)}
											>
												Разблокировать
											</button>
											<button onClick={closeModal}> Отмена </button>
										</div>
									</div>
								</ModalTs>
							</>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default BlockedPages;
