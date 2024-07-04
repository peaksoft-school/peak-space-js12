import { useEffect, useState } from 'react';

const useDebounce = (value: string | number | number[], delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const t = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(t);
		};
	}, [value, delay]);
	return debouncedValue;
};

export default useDebounce;
