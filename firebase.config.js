// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBC9VtJZ0O82nqlypCQ3dIxvcjUW7WR1ak',
	authDomain: 'signal-clone-59d47.firebaseapp.com',
	projectId: 'signal-clone-59d47',
	storageBucket: 'signal-clone-59d47.appspot.com',
	messagingSenderId: '94126960580',
	appId: '1:94126960580:web:89eb6dee2009ae9fe4fe91',
	measurementId: 'G-5KLBW2WJVT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
