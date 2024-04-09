import { IconDown, ProfilePicture, SearchImg } from '@/src/assets/icons';
import scss from './CustomSearchInput.module.scss';
import { useState } from 'react';

const CustomSearchInput = () => {
	const [isBurgerMenuActive, setIsBurgerMenuActive] = useState<boolean>(false);

	const changeBurgerMenuStateHandler = () => {
		setIsBurgerMenuActive((prevState) => !prevState);
	};
	return (
		<div className={scss.headerContainer}>
			<div className={scss.aside}>
				<SearchImg className={scss.magnifyingGlass} onClick={() => {}} />
				<input type="text" />
			</div>
			<div className={scss.profilePictureAndIconDown}>
				<img
					className={scss.profilePicture}
					src={ProfilePicture}
					alt="profile-picture"
				/>
				<img src={IconDown} alt="icon-down" className={scss.iconDown} />
			</div>
			<div className={isBurgerMenuActive ? scss.burgerMenu_active : scss.burgerMenu} onClick={changeBurgerMenuStateHandler}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default CustomSearchInput;
