import { FC, ReactNode, useEffect } from 'react';
import { useGetMeQuery } from '../redux/api/auth';
import { useNavigate } from 'react-router-dom';

interface CallDetectorProps {
	children: ReactNode;
}

const CallDetector: FC<CallDetectorProps> = ({ children }) => {
	const { data } = useGetMeQuery();
	const navigate = useNavigate();

	useEffect(() => {
		if (!data?.firstName || !data?.lastName) return;

		const userName = `${data.firstName} ${data.lastName}`;

		const fillInput = () => {
			const input = document.querySelector(
				'.TYiiRFB3EhYJGVPE4k4q'
			) as HTMLInputElement | null;
			if (input) {
				const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
					window.HTMLInputElement.prototype,
					'value'
				)?.set;
				nativeInputValueSetter?.call(input, userName);

				const event = new Event('input', { bubbles: true });
				input.dispatchEvent(event);

				const changeEvent = new Event('change', { bubbles: true });
				input.dispatchEvent(changeEvent);

				return true;
			}
			return false;
		};

		const checkAndClickButton = () => {
			const button = document.querySelector(
				'.VsTVUAD89KWleD0YRVsD'
			) as HTMLButtonElement | null;
			if (button) {
				button.click();
			}
		};

		const handleExitButtonClick = () => {
			const exitButton = document.querySelector(
				'.TTgLs8cpg66Z6CXgHGVA'
			) as HTMLButtonElement | null;
			if (exitButton) {
				exitButton.addEventListener('click', () => {
					const chatPath = localStorage.getItem('historyChatPath');
					if (chatPath) {
						navigate(chatPath);
						window.location.reload();
					}
				});
			}
		};

		const inputIntervalId = setInterval(() => {
			const inputFilled = fillInput();
			if (inputFilled) {
				clearInterval(inputIntervalId);

				const buttonIntervalId = setInterval(() => {
					checkAndClickButton();
					clearInterval(buttonIntervalId);
				}, 100);
			}
		}, 250);

		const exitButtonCheckIntervalId = setInterval(() => {
			handleExitButtonClick();
		}, 100);

		return () => {
			clearInterval(inputIntervalId);
			clearInterval(exitButtonCheckIntervalId);
		};
	}, [data, navigate]);

	return <>{children}</>;
};

export default CallDetector;
