interface EditProfileNameProps {
	className?: string;
	onClick: () => void;
}
const EditProfilName: React.FC<EditProfileNameProps> = ({
	className,
	onClick
}) => {
	return (
		<div>
			<svg
				className={className}
				onClick={onClick}
				width="28.000000"
				height="28.000000"
				viewBox="0 0 28 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<desc>Created with Pixso.</desc>
				<defs>
					<clipPath id="clip30_346">
						<rect
							id="lucide:pencil-line"
							width="28.000000"
							height="28.000000"
							fill="white"
							fill-opacity="0"
						/>
					</clipPath>
				</defs>
				<rect
					id="lucide:pencil-line"
					width="28.000000"
					height="28.000000"
					fill="#FFFFFF"
					fill-opacity="0"
				/>
				<g clip-path="url(#clip30_346)">
					<path
						id="Vector"
						d="M14 23.33L24.5 23.33M21 3.35C21.32 3.35 21.64 3.42 21.94 3.54C22.24 3.67 22.52 3.85 22.75 4.08C22.97 4.31 23.16 4.58 23.28 4.88C23.41 5.18 23.47 5.5 23.47 5.83C23.47 6.15 23.41 6.48 23.28 6.78C23.16 7.08 22.97 7.35 22.75 7.58L8.16 22.16L3.5 23.33L4.66 18.66L19.25 4.08C19.71 3.61 20.34 3.35 21 3.35ZM17.5 5.83L21 9.33"
						stroke="#000000"
						stroke-opacity="0.700000"
						stroke-width="2.000000"
						stroke-linejoin="round"
					/>
				</g>
			</svg>
		</div>
	);
};

export default EditProfilName;
