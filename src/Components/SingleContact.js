import { collection, doc, getDocs , orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from '../firebase';

function SingleContact({id, name}) {
  
  const [seed, setSeed] = useState('');
  const [lastMessage, setLastMessage] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
    async function getMessage() {
      const messagedb = collection(db, 'rooms', id, 'messages');
      const orderedList = query(messagedb, orderBy('timestamp', 'desc'));
      const getList = await getDocs(orderedList);

      const data = getList.docs.map(doc => doc.data());
      setLastMessage(data)
    }
    getMessage();
  }, [])

  return (
    <Link key={id} to={`/room/${id}/${seed}`}>
      <div className='flex justify-between py-2 px-3 hover:bg-gray-100 border-b-[1px] border-gray-100' key={id}>
        <div className="flex space-x-4 items-center">
          <img src={`https://avatars.dicebear.com/api/human/${seed}.svg`} alt="profile" className='rounded-full w-11 h-11' />
          <div className='flex flex-col'>
            <h3 className='font-semibold'>{name}</h3>
            <p className='text-gray-500 text-sm'>{lastMessage[0]?.message}</p>
          </div>        
        </div>
        <small className='text-gray-500'>15:00</small>
      </div>
    </Link>
  )
}

export default SingleContact