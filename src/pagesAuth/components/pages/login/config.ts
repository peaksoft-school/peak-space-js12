import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDPsK0XoNXeH1RvoxnclcM_qWbUhDjHyVY',
	authDomain: 'just-22fdd.firebaseapp.com',
	projectId: 'just-22fdd',
	storageBucket: 'just-22fdd.appspot.com',
	messagingSenderId: '241893520630',
	appId: '1:241893520630:web:8d9c13f4b1da9aeb7b68d7',
	measurementId: 'G-6F241FD333'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
