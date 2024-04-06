import React from 'react';

interface EditImgProps {
	className?: string;
}

const EditImg: React.FC<EditImgProps> = ({ className }) => {
	return (
		<svg
			className={className}
			width="23.000000"
			height="22.000000"
			viewBox="0 0 23 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<desc>Created with Pixso</desc>
			<defs />
			<path
				id="Vector"
				d="M11 20.33L21.5 20.33M18 0.35C18.32 0.35 18.64 0.42 18.94 0.54C19.24 0.67 19.52 0.85 19.75 1.08C19.97 1.31 20.16 1.58 20.28 1.88C20.41 2.18 20.47 2.5 20.47 2.83C20.47 3.15 20.41 3.48 20.28 3.78C20.16 4.08 19.97 4.35 19.75 4.58L5.16 19.16L0.5 20.33L1.66 15.66L16.25 1.08C16.71 0.61 17.34 0.35 18 0.35ZM14.5 2.83L18 6.33"
				stroke="rgb(255, 255, 255)"
				strokeOpacity="0.800000"
				strokeWidth="2.00000"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default EditImg;
