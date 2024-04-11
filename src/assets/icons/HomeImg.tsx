import { FC } from 'react';

interface HomeProps {
	className?: string;
	
}

const HomeImg: FC<HomeProps> = ({ className,  }) => {
	return (
		<>
			<svg
				className={className}
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_246_2416)">
					<path
						d="M4 10V17C4 18.8856 4 19.8284 4.58579 20.4142C5.17157 21 6.11438 21 8 21H16C17.8856 21 18.8284 21 19.4142 20.4142C20 19.8284 20 18.8856 20 17V10"
						stroke="currentColor"
						stroke-opacity="0.7"
						stroke-width="2"
					/>
					<path
						d="M3 11L9.17158 4.82842C10.5049 3.49509 11.1716 2.82843 12 2.82843C12.8284 2.82843 13.4951 3.49509 14.8284 4.82843L21 11"
						stroke="currentColor"
						stroke-opacity="0.7"
						stroke-width="2"
						stroke-linecap="round"
					/>
					<path
						d="M9 17C9 16.0681 9 15.6022 9.15224 15.2346C9.35523 14.7446 9.74458 14.3552 10.2346 14.1522C10.6022 14 11.0681 14 12 14C12.9319 14 13.3978 14 13.7654 14.1522C14.2554 14.3552 14.6448 14.7446 14.8478 15.2346C15 15.6022 15 16.0681 15 17V21H9V17Z"
						fill="currentColor"
						fill-opacity="0.7"
					/>
					<path
						d="M16 4.5C16 4.03406 16 3.80109 16.0761 3.61732C16.1776 3.37229 16.3723 3.17761 16.6173 3.07612C16.8011 3 17.0341 3 17.5 3C17.9659 3 18.1989 3 18.3827 3.07612C18.6277 3.17761 18.8224 3.37229 18.9239 3.61732C19 3.80109 19 4.03406 19 4.5V10L16 6.5V4.5Z"
						fill="currentColor"
						fill-opacity="0.7"
					/>
				</g>
				<defs>
					<clipPath id="clip0_246_2416">
						<rect width="24" height="24" fill="currentColor" />
					</clipPath>
				</defs>
			</svg>
		</>
	);
};

export default HomeImg;
