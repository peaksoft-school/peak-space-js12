import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutSide from './pagesSide/components/layout/LayoutSide';
import MyFriends from './UI/myFriends/MyFriends';

const App = () => {
	return (
		<>
			<Routes>
				<MyFriends />
				<Route path="/*" element={<LayoutSide />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
			</Routes>
		</>
	);
};

export default App;
