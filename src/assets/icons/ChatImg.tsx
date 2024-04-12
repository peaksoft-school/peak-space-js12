import { FC } from 'react';

interface ChatImgProps {
	className: string;
}

const ChatImg: FC<ChatImgProps> = ({ className }) => {
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
				<g clip-path="url(#clip0_247_1505)">
					<path
						d="M5.07119 14.9954L4.41186 15.7473L5.07119 14.9954ZM8.625 16.8668L8.89232 15.9032L8.625 16.8668ZM3.95312 19.0497L3.48282 19.9322C3.52981 19.9572 3.57873 19.9785 3.6291 19.9957L3.95312 19.0497ZM19.125 10.3546C19.125 12.2011 18.3171 13.6843 16.9821 14.7301C15.6283 15.7907 13.7011 16.4194 11.5 16.4194V18.4194C14.0624 18.4194 16.4476 17.6895 18.2155 16.3045C20.0021 14.9049 21.125 12.8557 21.125 10.3546H19.125ZM3.875 10.3546C3.875 8.86017 4.63969 7.50639 5.99869 6.49379C7.3649 5.47582 9.30446 4.83331 11.5 4.83331V2.83331C8.93208 2.83331 6.55914 3.58205 4.80372 4.89003C3.04108 6.20338 1.875 8.11024 1.875 10.3546H3.875ZM11.5 4.83331C13.7474 4.83331 15.6837 5.34864 17.0273 6.28427C18.3325 7.19314 19.125 8.52339 19.125 10.3546H21.125C21.125 7.83831 19.9867 5.9079 18.1702 4.643C16.3922 3.40487 14.016 2.83331 11.5 2.83331V4.83331ZM5.73053 14.2436C4.55956 13.2167 3.875 11.7728 3.875 10.3546H1.875C1.875 12.4042 2.85135 14.3788 4.41186 15.7473L5.73053 14.2436ZM11.5 16.4194C10.6602 16.4194 9.84647 16.1679 8.89232 15.9032L8.35768 17.8304C9.20201 18.0646 10.3236 18.4194 11.5 18.4194V16.4194ZM8.89232 15.9032C8.41948 15.772 8.01949 15.9566 7.83369 16.0581C7.62039 16.1746 7.42137 16.3331 7.26073 16.4696C7.09473 16.6107 6.91327 16.7778 6.74552 16.9302C6.57054 17.0892 6.3957 17.2459 6.21397 17.3957C5.42607 18.0449 4.82672 18.2919 4.27714 18.1036L3.6291 19.9957C5.27572 20.5597 6.662 19.618 7.48583 18.9392C7.70704 18.7569 7.91176 18.5728 8.09043 18.4105C8.27632 18.2416 8.42259 18.1069 8.55584 17.9937C8.69446 17.8759 8.76621 17.8276 8.79267 17.8132C8.84663 17.7837 8.65537 17.913 8.35768 17.8304L8.89232 15.9032ZM4.42343 18.1672C4.6284 18.2764 4.74841 18.4472 4.80514 18.5917C4.85409 18.7163 4.85247 18.8085 4.85217 18.8233C4.85169 18.847 4.85166 18.7991 4.90084 18.6429C4.99427 18.3462 5.16985 17.9442 5.38239 17.4675C5.58 17.0242 5.81214 16.5108 5.95866 16.0832C6.03051 15.8735 6.10419 15.6223 6.12913 15.376C6.14626 15.2068 6.18769 14.6445 5.73053 14.2436L4.41186 15.7473C4.23453 15.5918 4.1724 15.4109 4.15178 15.3143C4.14137 15.2656 4.13903 15.2284 4.13853 15.2079C4.13802 15.1868 4.13925 15.175 4.1393 15.1746C4.13938 15.1737 4.1388 15.1796 4.13622 15.1932C4.13367 15.2066 4.12967 15.225 4.1236 15.2487C4.11125 15.2971 4.09272 15.3588 4.06663 15.4349C3.95614 15.7574 3.7696 16.1733 3.5557 16.6531C3.35673 17.0994 3.128 17.614 2.99317 18.0423C2.92822 18.2486 2.85807 18.5153 2.85259 18.7823C2.84799 19.0067 2.88982 19.6162 3.48282 19.9322L4.42343 18.1672Z"
						fill="currentColor"
						fill-opacity="0.7"
					/>
				</g>
				<defs>
					<clipPath id="clip0_247_1505">
						<rect width="23" height="23" fill="currentColor" />
					</clipPath>
				</defs>
			</svg>
		</>
	);
};

export default ChatImg;