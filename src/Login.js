import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { auth, provider } from './firebase';
import { reducerCases } from './utilities/Constants';
import { useStateProvider } from './utilities/StateProvider';

function Login() {

  const [{}, dispatch] = useStateProvider();

  const LoginHandler = () => {
    signInWithPopup(auth, provider).then((result) => {
      dispatch({type: reducerCases.SET_USER, user:result.user});
      console.log(result.user);
    });
  }
  return (
    <div className='w-screen h-screen bg-white'>
      <div className='flex flex-col items-center justify-center h-full background-wall'>
        <div className='bg-white shadow-md py-16 px-24 rounded-lg space-y-8'>
          <img className='w-28 mx-auto' src='/whatsapp-logo.png' alt="Logo" />
          <button className='text-lg rounded-md font-semibold py-2 px-6 bg-green-600 hover:bg-slate-400 text-white hover:text-black shadow-lg cursor-pointer hover:opacity-80' onClick={LoginHandler}>Login to Whatsapp</button>
        </div>
      </div>
    </div>
  )
}

export default Login;
