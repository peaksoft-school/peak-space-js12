import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutSide from './pagesSide/components/layout/LayoutSide';
import Call from './pagesSide/components/pages/call/Call';
import CallTime from './pagesSide/components/pages/call/CallTime';
import VideoCall from './pagesSide/components/pages/call/VideoCall';
import VideoEnd from './pagesSide/components/pages/call/VideoEnd';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<LayoutSide />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
				<Route path="/call" element={<Call />} />
				<Route path="/calltime" element={<CallTime />} />
				<Route path="/videocall" element={<VideoCall />} />
				<Route path="/videoend" element={<VideoEnd />} />
			</Routes>
		</>
	);
};

export default App;
