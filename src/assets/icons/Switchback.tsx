import { useState } from 'react';
import { Switch } from 'antd';

const Siwtchback = () => {
	const [ellipsis, setEllipsis] = useState(true);
	return (
		<>
			<Switch
				checked={ellipsis}
				onChange={() => {
					setEllipsis(!ellipsis);
				}}
			/>
		</>
	);
};
export default Siwtchback;

