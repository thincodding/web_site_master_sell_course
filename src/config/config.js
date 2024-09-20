import {initializeApp} from 'firebase/app'
import {getFirestore, serverTimestamp} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage';


//sokthinqwe22@gmail.com 

//projectName: firebase

const firebaseConfig = {
    apiKey: "AIzaSyCdjn6m-i2PMuZs9Yp0gVwH-__lVhGA4Rg",
    authDomain: "fir-fe2ab.firebaseapp.com",
    databaseURL: "https://fir-fe2ab-default-rtdb.firebaseio.com",
    projectId: "fir-fe2ab",
    storageBucket: "fir-fe2ab.appspot.com",
    messagingSenderId: "904321686369",
    appId: "1:904321686369:web:ffd92dfbc9ca2c2bf9c320",
    measurementId: "G-9TFR206SVT"
};

const firebaseApp = initializeApp(firebaseConfig)
const projectFirestore = getFirestore(firebaseApp)
const projectAuth = getAuth(firebaseApp)
const projectStorage = getStorage(firebaseApp)
const timestamp= serverTimestamp;

export {projectFirestore, projectAuth,timestamp, projectStorage}
