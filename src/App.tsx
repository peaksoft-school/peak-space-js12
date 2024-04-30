import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutSide from './pagesSide/components/layout/LayoutSide';
import { useEffect, useState } from 'react';
import Preloader from './UI/preloader/Preloader';
import Call from './pagesSide/components/pages/call/Call';
import CallTime from './pagesSide/components/pages/call/CallTime';
import VideoCall from './pagesSide/components/pages/call/VideoCall';
import VideoEnd from './pagesSide/components/pages/call/VideoEnd';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);
	return (
		<>
			{isLoading ? (
				<>
					<Preloader />
				</>
			) : (
				<>
					<Routes>
						<Route path="/*" element={<LayoutSide />} />
						<Route path="/auth/*" element={<LayoutAuth />} />
						<Route path="/call" element={<Call />} />
						<Route path="call/Time" element={<CallTime />} />
						<Route path="video/call" element={<VideoCall />} />
						<Route path="video/end" element={<VideoEnd />} />
					</Routes>
				</>
			)}
		</>
	);
};

export default App;
