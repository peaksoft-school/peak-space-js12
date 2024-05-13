// // CustomSelect.js
// import { SetStateAction, useState } from 'react';
// import { ArrowDown } from '@/src/assets/icons';
// import scss from './CustomSelect.module.scss';

// const CustomSelect = () => {
//     const [selectedOption, setSelectedOption] = useState('');

//     const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
//         setSelectedOption(event.target.value);
//     };

//     const data = [
//         { name: 'BATKEN' },
//         { name: 'нарын' },
//         { name: 'ыссык-кол' },
//         { name: 'чуй' },
//         { name: 'талас' },
//         { name: 'жала-абад' },
//         { name: 'ОШ' }
//     ];

//     return (
//         <div className={scss.selectBox}>
//             <select className={scss.select} name="data" id="12" onChange={handleChange} value={selectedOption}>
//                 {data.map((item, index) => (
//                     <option className={scss.option} key={index} value={item.name}>
//                         {item.name}
//                     </option>
//                 ))}
//             </select>
//             <ArrowDown className={scss.arrowDown} onClick={function (): void {
//           throw new Error('Function not implemented.');
//         } } />
//         </div>
//     );
// };

// export default CustomSelect;

// CustomSelect.js
import { SetStateAction, useState } from 'react';
import { ArrowDown } from '@/src/assets/icons';
import scss from './CustomSelect.module.scss';

const CustomSelect = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		toggleDropdown();
	};

	const data = [
		{ name: 'BATKEN' },
		{ name: 'нарын' },
		{ name: 'ыссык-кол' },
		{ name: 'чуй' },
		{ name: 'талас' },
		{ name: 'жала-абад' },
		{ name: 'ОШ' }
	];

	return (
		<div className={scss.selectBox}>
			<div className={scss.select} onClick={toggleDropdown}>
				{selectedOption || 'Выберите опцию'}
				<ArrowDown
					className={scss.arrowDown}
					onClick={function (): void {
						throw new Error('Function not implemented.');
					}}
				/>
			</div>
			{isOpen && (
				<div className={scss.dropdown}>
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
