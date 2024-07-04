import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAyFFnCWr_MlyN1tQFHWeyG3I_Lu9E2WS8',
	authDomain: 'finsihpeakspace.firebaseapp.com',
	projectId: 'finsihpeakspace',
	storageBucket: 'finsihpeakspace.appspot.com',
	messagingSenderId: '914743496172',
	appId: '1:914743496172:web:77bcc4080b3f003dfbc4c9',
	measurementId: 'G-YY2RRC62XJ'
};
const app = initializeApp(firebaseConfig, 'finsihpeakspace');
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
