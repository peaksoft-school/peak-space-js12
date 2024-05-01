import { FC } from 'react';

interface PointProps {
	onClick: () => void;
}
const Point: FC<PointProps> = ({ onClick }) => {
	return (
		<div>
			<svg
				onClick={onClick}
				width="31.000000"
				height="7.000000"
				viewBox="0 0 31 7"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc>Created with Pixso.</desc>
				<defs />
				<circle
					id="Ellipse 57"
					cx="3.500000"
					cy="3.500000"
					r="3.500000"
					fill="#000000"
					fill-opacity="0.600000"
				/>
				<circle
					id="Ellipse 58"
					cx="15.500000"
					cy="3.500000"
					r="3.500000"
					fill="#000000"
					fill-opacity="0.600000"
				/>
				<circle
					id="Ellipse 59"
					cx="27.500000"
					cy="3.500000"
					r="3.500000"
					fill="#000000"
					fill-opacity="0.600000"
				/>
			</svg>
		</div>
	);
};

export default Point;
