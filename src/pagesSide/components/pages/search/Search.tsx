import React from 'react';

interface SearchComponentProps {
	onClose: () => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onClose }) => {
	// Логика компонента поиска

	const handleClose = () => {
		onClose(); // Вызываем функцию onClose для закрытия компонента
	};

	return (
		<div>
			<h1>Search Component</h1>
			<button onClick={handleClose}>Закрыть</button>
		</div>
	);
};

export default SearchComponent;
