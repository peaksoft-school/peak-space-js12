import  { FC } from 'react';
interface Select {
	className?: string;
	onClick: () => void;
}
const ArrowDown: FC<Select> = ({ className, onClick }) => {
	return (
		<div>
			<svg
				className={className}
				onClick={onClick}
				width="23"
				height="10"
				viewBox="0 0 23 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M11.5 10L0 0H23L11.5 10Z" fill="black" fill-opacity="0.4" />
			</svg>
		</div>
	);
};

export default ArrowDown;
