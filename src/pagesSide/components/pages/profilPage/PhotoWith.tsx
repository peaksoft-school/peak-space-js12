import { DragEvent, useEffect, useState } from 'react';
import scss from './Style.module.scss';
import { useGetUserPhotoQuery } from '@/src/redux/api/photoWuthUser';

interface Card {
	id: number;
	img: string;
	order: number;
}

const PhotoWith = () => {
	const { data, isLoading } = useGetUserPhotoQuery();
	const [cardList, setCardList] = useState<Card[]>(() => {
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

	const [currentCard, setCurrentCard] = useState<Card | null>(null);

	const dragStartHandler = (e: DragEvent<HTMLDivElement>, item: Card) => {
		setCurrentCard(item);
	};

	const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const dragHandler = (e: DragEvent<HTMLDivElement>, item: Card) => {
		e.preventDefault();
		const newCardList = [...cardList];
		const draggedCardIndex = newCardList.findIndex(
			(card) => card.id === currentCard!.id
		);
		const droppedCardIndex = newCardList.findIndex(
			(card) => card.id === item.id
		);

		const temp = newCardList[draggedCardIndex];
		newCardList[draggedCardIndex] = newCardList[droppedCardIndex];
		newCardList[droppedCardIndex] = temp;

		setCardList(newCardList);
	};

	const sortCards = (a: Card, b: Card) => {
		return a.order - b.order;
	};

	return (
		<div className={scss.photo}>
			{isLoading ? (
				<h1>Loading . . .</h1>
			) : (
				<>
					{cardList.sort(sortCards).map((item) => (
						<div className={scss.photo_user} key={item.id}>
							<img
								draggable={true}
								onDragStart={(e) => dragStartHandler(e, item)}
								onDragOver={dragOverHandler}
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
