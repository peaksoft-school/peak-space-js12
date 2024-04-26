import { SetStateAction, useState } from 'react';
import scss from './CustomSelect.module.scss';

const CustomSelect = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (name: SetStateAction<string>) => {
		setSelectedOption(name);
		toggleDropdown();
	};

	const data = [
		{ name: '1' },
		{ name: '2' },
		{ name: '3' },
		{ name: '4' },
		{ name: '5' },
		{ name: '6' },
		{ name: '7' }
	];

	return (
		<div className={scss.selectBox}>
			<div className={scss.selectedOption} onClick={toggleDropdown}>
				{selectedOption ? selectedOption : 'Выберите'}
			</div>
			{isOpen && (
				<div className={scss.options}>
					{data.map((item, index) => (
						<div
							key={index}
							className={scss.option}
							onClick={() => handleOptionClick(item.name)}
						>
							{item.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
