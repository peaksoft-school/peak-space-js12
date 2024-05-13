import { FC } from 'react';

interface SmileProps {
	onClick: () => void;
}
const Smile: FC<SmileProps> = ({ onClick }) => {
	return (
		<div>
			<svg
				onClick={onClick}
				width="21.000000"
				height="21.000000"
				viewBox="0 0 21 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc>Created with Pixso.</desc>
				<defs />
				<path
					id="Vector"
					d="M10 20C10.64 20 11.25 19.7 11.7 19.24L19.24 11.7C19.69 11.25 20 10.64 20 10C20 4.47 15.52 0 10 0C4.47 0 0 4.47 0 10C0 15.52 4.47 20 10 20Z"
					stroke="#000000"
					stroke-opacity="0.800000"
					stroke-width="1.500000"
				/>
				<path
					id="Vector"
					d="M10 15C8.88 15 7.84 14.63 7 14"
					stroke="#000000"
					stroke-opacity="0.800000"
					stroke-width="1.500000"
					stroke-linecap="round"
				/>
				<path
					id="Vector"
					d="M14 8.5C14 9.32 13.55 10 13 10C12.44 10 12 9.32 12 8.5C12 7.67 12.44 7 13 7C13.55 7 14 7.67 14 8.5Z"
					fill="#000000"
					fill-opacity="0.800000"
					fill-rule="evenodd"
				/>
				<path
					id="Vector"
					d="M8 8.5C8 9.32 7.55 10 7 10C6.44 10 6 9.32 6 8.5C6 7.67 6.44 7 7 7C7.55 7 8 7.67 8 8.5Z"
					fill="#000000"
					fill-opacity="0.800000"
					fill-rule="evenodd"
				/>
				<path
					id="Vector"
					d="M10 20C10 17.2 10 15.81 10.39 14.68C10.74 13.69 11.3 12.79 12.05 12.05C12.79 11.3 13.69 10.74 14.68 10.39C15.81 10 17.2 10 20 10"
					stroke="#000000"
					stroke-opacity="0.800000"
					stroke-width="1.500000"
				/>
			</svg>
		</div>
	);
};

export default Smile;
