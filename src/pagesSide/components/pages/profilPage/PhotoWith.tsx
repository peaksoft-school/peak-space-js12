import { DragEvent, useEffect, useState } from 'react';
import scss from './Style.module.scss';
import { useGetUserPhotoQuery } from '@/src/redux/api/photoWuthUser';

const PhotoWith = () => {
	const { data, isLoading } = useGetUserPhotoQuery();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [cardList, setCardList] = useState<null | any>(() => {
		const storedOrder = localStorage.getItem('cardOrder');
		if (storedOrder) {
			return JSON.parse(storedOrder);
		} else {
			return data?.map((item, index) => ({ ...item, order: index })) || [];
		}
	});
	useEffect(() => {
		if (cardList) {
			localStorage.setItem('cardOrder', JSON.stringify(cardList));
		}
	}, [cardList]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [currentCard, setCurrentCard] = useState<null | any>(null);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function dragStartHandler(
		e: DragEvent<HTMLDivElement>,
		item: { id: number; img: string }
	) {
		setCurrentCard(item);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function dragEndHandler(e: DragEvent<HTMLDivElement>) {}

	function dragOverHandler(e: DragEvent<HTMLDivElement>) {
		e.preventDefault();
	}
	function dragHandler(
		e: DragEvent<HTMLDivElement>,
		item: { id: number; img: string }
	) {
		e.preventDefault();
		const newCardList = [...cardList];
		const draggedCardIndex = newCardList.findIndex(
			(card) => card.id === currentCard.id
		);
		const droppedCardIndex = newCardList.findIndex(
			(card) => card.id === item.id
		);

		const temp = newCardList[draggedCardIndex];
		newCardList[draggedCardIndex] = newCardList[droppedCardIndex];
		newCardList[droppedCardIndex] = temp;

		setCardList(newCardList);
	}

	const sortCards = (a: { order: number }, b: { order: number }) => {
		if (a.order > b.order) {
			return 1;
		} else {
			-1;
		}
	};

	return (
		<div className={scss.photo}>
			{isLoading ? (
				<h1>Loading . . .</h1>
			) : (
				<>
					{cardList
						?.sort(sortCards)
						.map((item: { id: number; img: string }) => (
							<div className={scss.photo_user} key={item.id}>
								<img
									draggable={true}
									onDragStart={(e) => dragStartHandler(e, item)}
									onDragLeave={dragEndHandler}
									onDragEnd={dragEndHandler}
									onDragOver={(e) => dragOverHandler(e)}
									onDrop={(e) => dragHandler(e, item)}
									src={item.img}
									alt=""
								/>
							</div>
						))}
				</>
			)}
		</div>
	);
};

export default PhotoWith;
