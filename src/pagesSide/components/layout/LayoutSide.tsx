import scss from './LayoutSide.module.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import ProfilPage from '../pages/profilPage/ProfilPage';
import NavBar from '@/src/UI/navBar/NavBar';
import EditProfilePage from '../pages/editProfilePage/EditProfilePage';
import MainPage from '../pages/mainPage/MainPage';
import Footer from './footer/Footer';
import ChatMeg from '../pages/chat/ChatMeg';
import ChatPerson from '../pages/chat/ChatPerson';

const LayoutSide = () => {
    const location = useLocation();

    const isSettingsPage = location.pathname === '/Settings';
    const isChat = location.pathname === '/chatMeg';
    const isChatPerson = location.pathname === '/chatPerson';

    return (
        <div className={scss.Layout}>
            <Header />
            <div style={{ background: '#ebeff3' }}>
                <main className="container">
                    { !isChatPerson && <NavBar /> }
                    <Routes>
                        <Route path="side/*" element={<ProfilPage />} />
                        <Route path="/Settings" element={<EditProfilePage />} />
                        <Route path="/main" element={<MainPage />} />
                        <Route path="/chatMeg" element={<ChatMeg />} />
                        <Route path="/chatPerson" element={<ChatPerson />} />
                    </Routes>
                </main>
            </div>
            {!isSettingsPage && !isChat && !isChatPerson && <Footer />}
        </div>
    );
};

export default LayoutSide;
