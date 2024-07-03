import { useState } from 'react';
import {
	useGetBlockedUsersQuery,
	usePutBlockedUsersMutation
} from '@/src/redux/api/blocked';
import ConfidentPage from './ConfidentPage';
import ModalTs from '@/src/ui/modal/Modal';
import scss from './Style.module.scss';
import Footer from '../../layout/footer/Footer';

const BlockedPages = () => {
	const { data, isLoading } = useGetBlockedUsersQuery();
	const [isModal, setIsModal] = useState(false);
	const [putBlockedUsers] = usePutBlockedUsersMutation();
	const [blockById, setBlockById] = useState<number | null>(null);

	const handlePutUsers = async (id: number) => {
		await putBlockedUsers(id);
		setIsModal(false);
	};

	const openModal = (id: number) => {
		setBlockById(id);
		setIsModal(true);
	};

	const closeModal = () => {
		setIsModal(false);
		setBlockById(null);
	};
	return (
		<div className={scss.blocked}>
			<ConfidentPage />

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
									<div className={scss.content}>
										<div className={scss.start}>
											<img src={item.avatar} alt={item.userName} />
											<div className={scss.text}>
												<h3>{item.userName}</h3>
												<p>{item.lastName}</p>
											</div>
										</div>
										<button onClick={() => openModal(item.id)}>
											Разблокировать
										</button>
									</div>

									<Footer />
								</div>
								<ModalTs open={isModal} onCancel={closeModal}>
									<div className={scss.modals}>
										<div className={scss.text}>
											<h1> {item.userName}</h1>
											<p>
												Теперь {item.userName} сможет отправить вам запрос на
												подписку и обмен сообщениями в Peakspace. Он/она не
												узнает, что вы его/ее разблокировали.
											</p>
										</div>
										<div className={scss.buttons}>
											<button
												className={scss.button1}
												onClick={() => handlePutUsers(blockById!)}
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
