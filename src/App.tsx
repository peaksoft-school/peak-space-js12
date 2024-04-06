import { Routes, Route } from 'react-router-dom';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import LayoutSide from './pagesSide/components/layout/LayoutSide';
import AddStory from './UI/userImages/AddStory';
import UserProfile from './UI/userImages/UserProfil';
import UserStory from './UI/userImages/UserStory';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/*" element={<LayoutSide />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
			</Routes>
			<AddStory />
			<UserProfile />
			<UserStory />
		</>
	);
};

export default App;
