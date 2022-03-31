import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA-YkBskF7yN_EAwfT6j5B0hDp3yqRNtb0",
  authDomain: "shotouts-da5e0.firebaseapp.com",
  projectId: "shotouts-da5e0",
  storageBucket: "shotouts-da5e0.appspot.com",
  messagingSenderId: "430499099200",
  appId: "1:430499099200:web:11c9733c76596d714ea5a5",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
export const storage = getStorage(app);
