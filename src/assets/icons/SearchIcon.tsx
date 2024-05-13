import { FC } from 'react';

interface SearchIconProps {
	className: string;
	onClick: () => void;
}

const SearchIcon: FC<SearchIconProps> = ({ className, onClick }) => {
	return (
		<>
			<svg
				className={className}
				onClick={onClick}
				width="13.000000"
				height="14.000000"
				viewBox="0 0 13 14"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc>Created with Pixso.</desc>
				<defs />
				<path
					id="Vector"
					d="M4.5 0C5.52 0 6.52 0.28 7.39 0.82C8.26 1.36 8.97 2.13 9.42 3.05C9.88 3.96 10.07 4.99 9.97 6.01C9.88 7.03 9.5 8 8.88 8.82L12.77 12.72C12.91 12.86 12.99 13.05 12.98 13.25C12.98 13.44 12.9 13.63 12.77 13.77C12.63 13.91 12.44 13.99 12.24 13.99C12.04 13.99 11.85 13.91 11.71 13.78L7.82 9.88C7.12 10.41 6.31 10.76 5.45 10.91C4.59 11.06 3.71 11.01 2.88 10.75C2.04 10.49 1.28 10.04 0.66 9.43C0.03 8.82 -0.44 8.08 -0.72 7.25C-1 6.42 -1.07 5.54 -0.94 4.68C-0.81 3.81 -0.48 2.99 0.03 2.29C0.54 1.58 1.21 1 1.99 0.6C2.76 0.2 3.62 0 4.5 0ZM4.5 1.5C3.43 1.5 2.42 1.92 1.67 2.67C0.92 3.42 0.5 4.43 0.5 5.5C0.5 6.56 1.67 8.32 1.67 8.32C1.67 8.32 3.43 9.5 4.5 9.5C5.56 9.5 6.57 9.07 7.32 8.32C8.07 7.57 8.5 6.56 8.5 5.5C8.5 4.43 8.07 3.42 7.32 2.67C6.57 1.92 5.56 1.5 4.5 1.5Z"
					fill="currentColor"
					fill-opacity="1.000000"
					fill-rule="nonzero"
				/>
			</svg>
		</>
	);
};

export default SearchIcon;
