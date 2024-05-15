import { Switch } from 'antd';
import { useState } from 'react';
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
// const ComponentDemo = App;

// createRoot(mountNode).render(<ComponentDemo />);
