// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import  { collection, getFirestore } from 'firebase/firestore';
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';

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
let app;

if (getApps().length === 0) {
	app = initializeApp(firebaseConfig);
} else {
	app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

export {
	auth,
	db,
	collection,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
};
