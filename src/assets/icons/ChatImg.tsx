import { FC } from 'react';

interface ChatProps {
	className?: string;
}

const ChatImg: FC<ChatProps> = ({ className }) => {
	return (
		<>
			<svg
				className={className}
				width="23"
				height="23"
				viewBox="0 0 23 23"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_246_2417)">
					<path
						d="M5.07119 14.9954L4.41186 15.7472L5.07119 14.9954ZM8.625 16.8667L8.89232 15.9031L8.625 16.8667ZM3.95312 19.0496L3.48282 19.9321C3.52981 19.9572 3.57873 19.9784 3.6291 19.9957L3.95312 19.0496ZM19.125 10.3546C19.125 12.201 18.3171 13.6842 16.9821 14.73C15.6283 15.7906 13.7011 16.4193 11.5 16.4193V18.4193C14.0624 18.4193 16.4476 17.6894 18.2155 16.3045C20.0021 14.9048 21.125 12.8556 21.125 10.3546H19.125ZM3.875 10.3546C3.875 8.86011 4.63969 7.50633 5.99869 6.49373C7.3649 5.47576 9.30446 4.83325 11.5 4.83325V2.83325C8.93208 2.83325 6.55914 3.58199 4.80372 4.88997C3.04108 6.20332 1.875 8.11018 1.875 10.3546H3.875ZM11.5 4.83325C13.7474 4.83325 15.6837 5.34857 17.0273 6.28421C18.3325 7.19308 19.125 8.52333 19.125 10.3546H21.125C21.125 7.83825 19.9867 5.90784 18.1702 4.64294C16.3922 3.40481 14.016 2.83325 11.5 2.83325V4.83325ZM5.73053 14.2435C4.55956 13.2166 3.875 11.7727 3.875 10.3546H1.875C1.875 12.4041 2.85135 14.3787 4.41186 15.7472L5.73053 14.2435ZM11.5 16.4193C10.6602 16.4193 9.84647 16.1678 8.89232 15.9031L8.35768 17.8303C9.20201 18.0646 10.3236 18.4193 11.5 18.4193V16.4193ZM8.89232 15.9031C8.41948 15.7719 8.01949 15.9565 7.83369 16.058C7.62039 16.1746 7.42137 16.333 7.26073 16.4696C7.09473 16.6106 6.91327 16.7778 6.74552 16.9302C6.57054 17.0892 6.3957 17.2459 6.21397 17.3956C5.42607 18.0448 4.82672 18.2918 4.27714 18.1036L3.6291 19.9957C5.27572 20.5596 6.662 19.618 7.48583 18.9391C7.70704 18.7568 7.91176 18.5728 8.09043 18.4105C8.27632 18.2416 8.42259 18.1068 8.55584 17.9936C8.69446 17.8758 8.76621 17.8276 8.79267 17.8131C8.84663 17.7836 8.65537 17.9129 8.35768 17.8303L8.89232 15.9031ZM4.42343 18.1671C4.6284 18.2764 4.74841 18.4472 4.80514 18.5916C4.85409 18.7162 4.85247 18.8084 4.85217 18.8233C4.85169 18.8469 4.85166 18.7991 4.90084 18.6429C4.99427 18.3461 5.16985 17.9441 5.38239 17.4674C5.58 17.0242 5.81214 16.5108 5.95866 16.0831C6.03051 15.8734 6.10419 15.6222 6.12913 15.3759C6.14626 15.2067 6.18769 14.6444 5.73053 14.2435L4.41186 15.7472C4.23453 15.5917 4.1724 15.4108 4.15178 15.3143C4.14137 15.2655 4.13903 15.2283 4.13853 15.2078C4.13802 15.1868 4.13925 15.1749 4.1393 15.1745C4.13938 15.1737 4.1388 15.1796 4.13622 15.1932C4.13367 15.2065 4.12967 15.2249 4.1236 15.2487C4.11125 15.2971 4.09272 15.3587 4.06663 15.4349C3.95614 15.7574 3.7696 16.1733 3.5557 16.653C3.35673 17.0993 3.128 17.614 2.99317 18.0422C2.92822 18.2485 2.85807 18.5152 2.85259 18.7822C2.84799 19.0066 2.88982 19.6161 3.48282 19.9321L4.42343 18.1671Z"
						fill="currentColor"
						fill-opacity="0.7"
					/>
				</g>
				<defs>
					<clipPath id="clip0_246_2417">
						<rect width="23" height="23" fill="currentColor" />
					</clipPath>
				</defs>
			</svg>
		</>
	);
};

export default ChatImg;
