// import { FC, useEffect, useState } from 'react';
// import { Switch } from 'antd';

// interface SiwtchbackProps {
// 	open: () => void;
// 	onCancel: boolean;
// }

// const Siwtchback: FC<SiwtchbackProps> = ({ onCancel, open }) => {
// 	const [ellipsis, setEllipsis] = useState(onCancel);

// 	useEffect(() => {
// 		if (onCancel === true) {
// 			setEllipsis(onCancel);
// 		setEllipsis(ellipsis);
// 		}
// 	}, [onCancel]);

// 	return (
// 		<>
// 			<Switch onClick={open} checked={ellipsis} />
// 		</>
// 	);
// };

// export default Siwtchback;
