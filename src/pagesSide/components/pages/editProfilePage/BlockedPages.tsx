import { useState } from 'react';
import { useGetBlockedUsersQuery } from '@/src/redux/api/blocked';
import ConfidentPage from './ConfidentPage';
import ModalTs from '@/src/ui/modal/Modal';
import scss from './Style.module.scss';

const BlockedPages = () => {
	const { data, isLoading } = useGetBlockedUsersQuery();

	const [isModal, setIsModal] = useState(false);

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
							<div key={item.id} className={scss.card}>
								<div className={scss.start}>
									<img src={item.img} alt={item.name} />
									<div className={scss.text}>
										<h3>{item.name}</h3>
										<p>{item.title}</p>
									</div>
								</div>
								<button onClick={openModal}>Разблокировать</button>
							</div>
						))}
					</>
				)}

				<ModalTs open={isModal} onCancel={closeModal}>
					<div className={scss.modals}>
						<div className={scss.text}>
							<div>
								<h1>Разблокировать Sultanov_11_</h1>
							</div>
							<div >
								<p>
									Теперь Sultanov_11_ сможет отправить вам запрос на подписку
									и обмен сообщениями в Instagram. Он/она не узнает, что вы
									его/ее разблокировали.
								</p>
							</div>
						</div>
						<div className={scss.buttons}>
							<button className={scss.button1} onClick={closeModal}>
								Разблокировать
							</button>
							<button onClick={closeModal}> Отмена </button>
						</div>
					</div>
				</ModalTs>
			</div>
		</div>
	);
};

export default BlockedPages;
