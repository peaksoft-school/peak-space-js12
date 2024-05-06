import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutSide from './pagesSide/components/layout/LayoutSide';
import { useEffect, useState } from 'react';
import Preloader from './UI/preloader/Preloader';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
			console.log('hello 06.05.24');
		}, 1500);
	}, []);
	return (
		<>
			{isLoading ? (
				<>
					<Preloader />
				</>
			) : (
				<></>
			)}
			<Routes>
				<Route path="/*" element={<LayoutSide />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
			</Routes>
		</>
	);
};

export default App;
