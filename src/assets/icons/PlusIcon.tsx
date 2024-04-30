import { FC } from 'react';

interface plusIconProps {
	className: string;
	onClick: () => void;
}

const PlusIcon: FC<plusIconProps> = ({ className, onClick }) => {
	return (
		<svg
			className={className}
			onClick={onClick}
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6 0C2.68631 0 0 2.68631 0 6C0 9.31388 2.68631 12 6 12C9.31388 12 12 9.31388 12 6C12 2.68631 9.31388 0 6 0ZM6 11.2618C3.10519 11.2618 0.75 8.89481 0.75 5.99998C0.75 3.10516 3.10519 0.749977 6 0.749977C8.89481 0.749977 11.25 3.10518 11.25 5.99998C11.25 8.89478 8.89481 11.2618 6 11.2618ZM8.625 5.625H6.375V3.375C6.375 3.168 6.207 3 6 3C5.793 3 5.625 3.168 5.625 3.375V5.625H3.375C3.168 5.625 3 5.793 3 6C3 6.207 3.168 6.375 3.375 6.375H5.625V8.625C5.625 8.832 5.793 9 6 9C6.207 9 6.375 8.832 6.375 8.625V6.375H8.625C8.832 6.375 9 6.207 9 6C9 5.793 8.832 5.625 8.625 5.625Z"
				fill="black"
				fill-opacity="0.6"
			/>
		</svg>
	);
};

export default PlusIcon
