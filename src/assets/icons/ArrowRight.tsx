import { FC } from 'react';

interface ArrowRight {
	onClick: () => void;
}

const ArrowRight: FC<ArrowRight> = ({ onClick }) => {
	return (
		<div>
			<svg
				onClick={onClick}
				width="38.000000"
				height="64.000000"
				viewBox="0 0 38 64"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc>Created with Pixso.</desc>
				<defs>
					<filter
						id="filter_117_472_dd"
						x="-0.570312"
						y="-0.598755"
						width="37.638672"
						height="64.197510"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="0" dy="0" />
						<feGaussianBlur stdDeviation="3.33333" />
						<feComposite in2="hardAlpha" operator="out" k2="-1" k3="1" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect_dropShadow_1"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect_dropShadow_1"
							result="shape"
						/>
					</filter>
				</defs>
				<g filter="url(#filter_117_472_dd)">
					<path
						id="Vector 9"
						d="M9.42 11.09L24.01 32.34L25.25 31.5L24.01 30.65L9.42 51.9L11.9 53.59L27.06 31.5L11.9 9.4L9.42 11.09Z"
						fill="#FFFFFF"
						fill-opacity="1.000000"
						fill-rule="evenodd"
					/>
				</g>
			</svg>
		</div>
	);
};

export default ArrowRight;
