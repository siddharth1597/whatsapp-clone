import React, { useState } from 'react';
import ContactList from './ContactList';
import { 
  BsFillChatLeftTextFill,
  BsThreeDotsVertical,
  BsClockHistory,
  BsSearch
} from 'react-icons/bs';
import { useStateProvider } from '../utilities/StateProvider';
import { getAuth, signOut } from 'firebase/auth';

function LeftSide() {
  const [{user}] = useStateProvider();
  const [show, setShow] = useState(false);

  return (
    <div className='flex-[.5] border-r-2 border-gray-200'>
      <div className='flex justify-between items-center px-4 py-3 bg-gray-100 h-[10%]'>
        <div className='cursor-pointer'>
          <img src={user.photoURL} alt="Profile" className='rounded-full w-9 h-9' />
        </div>
        <div className='flex space-x-7 relative'>
          <BsClockHistory className='w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-600' />
          <BsFillChatLeftTextFill className='w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-600' />
          <BsThreeDotsVertical className='w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-600' onClick={e=>setShow(!show)} />
          {
            show &&
            <div className='absolute right-0 top-8 w-28 z-30 rounded-lg shadow-md'>
              <button className='w-full rounded-lg bg-white hover:bg-gray-200 text-black py-2 px-3' onClick={e=>signOut(getAuth())}>Sign Out</button>
            </div>
          }
        </div>
      </div>
      <div className='bg-gray-50 border-b-2 border-gray-100 p-2 sm:p-3  relative h-[10%]'>
        <BsSearch className="w-4 h-4 absolute top-6 left-7 text-gray-600" />
        <input type="text" className='rounded-md bg-white text-gray-800 placeholder:text-gray-600 py-2 px-12 w-full focus:outline-none' placeholder='Search or start a new chat' />
      </div>
      <div className='h-[80%] relative'>
        <ContactList />
      </div>
    </div>
  )
}

export default LeftSide;