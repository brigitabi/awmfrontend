import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { SiApple, SiFacebook } from 'react-icons/si';
import { firebaseClient } from '../config/firebase';

const Login = () => {
  const auth = getAuth(firebaseClient);

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user?.getIdToken();

      // TODO: add csrf token
      const { data } = await axios.post('http://localhost:8000/api/auth/login', { token });

      if (data) {
        window.location.href = '/';
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('Error signing up with Facebook', error.code, error.message);
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log('cred', credential);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user?.getIdToken();

      // TODO: add csrf token
      const { data } = await axios.post('http://localhost:8000/api/auth/login', { token });

      console.log('login data', data);

      if (data) {
        window.location.href = '/';
      }

      await auth.signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('Error signing up with Google', error.code, error.message);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('cred', credential);
      }
    }
  };

  const handleAppleLogin = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user?.getIdToken();

      // TODO: add csrf token
      const { data } = await axios.post('http://localhost:8000/api/auth/login', { token });

      if (data) {
        window.location.href = '/';
      }

      await auth.signOut();
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log('Error signing up with Apple', error.code, error.message);
        const credential = OAuthProvider.credentialFromError(error);
        console.log('cred', credential);
      }
    }
  };

  return (
    <div className="mt-16 text-center md:mx-auto lg:max-w-sm">
      <h1 className="text-4xl">Login to continue</h1>
      <p className="text-lg">Sign with one of these providers</p>
      <div className="mt-8 flex flex-col">
        <button
          className="mb-2 flex items-center justify-center rounded-lg bg-red-500 p-2 font-medium"
          onClick={handleGoogleLogin}
        >
          <FaGoogle className="mr-2 text-lg" />
          Login up with Google
        </button>
        <button
          className="mb-2 flex items-center justify-center rounded-lg bg-blue-500 p-2 font-medium"
          onClick={handleFacebookLogin}
        >
          <SiFacebook className="mr-2 text-lg" />
          Login up with Facebook
        </button>
        <button
          className="mb-2 flex items-center justify-center rounded-lg bg-black p-2 font-medium"
          onClick={handleAppleLogin}
        >
          <SiApple className="mr-2 text-lg" /> Login up with Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
