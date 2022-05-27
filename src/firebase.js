import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBB5lnZJc3lTHS5GysQ2BdN9RjNuSfMhzo',
  authDomain: 'brewdao.firebaseapp.com',
  databaseURL: 'https://brewdao-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'brewdao',
  storageBucket: 'brewdao.appspot.com',
  messagingSenderId: '58465518594',
  appId: '1:58465518594:web:85371b3a34ca5da584131b',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export default app
