import { FC } from 'react';

interface IconDownProps {
	className: string;
	onClick: () => void;
}

const IconDown: FC<IconDownProps> = ({ className, onClick }) => {
	return (
		<>
			<svg
				className={className}
				onClick={onClick}
				width="10.000000"
				height="6.000000"
				viewBox="0 0 10 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc>Created with Pixso.</desc>
				<defs />
				<path
					id="Vector"
					d="M5 5L0 -0.34L10 -0.34L5 5Z"
					fill="#000000"
					fill-opacity="0.400000"
					fill-rule="nonzero"
				/>
			</svg>
		</>
	);
};

export default IconDown;
