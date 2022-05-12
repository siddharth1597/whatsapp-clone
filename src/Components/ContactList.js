import React, { useEffect, useState } from 'react';
import SingleContact from './SingleContact';

import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../firebase';

import {
  BsPlusLg
} from 'react-icons/bs';

function ContactList() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chatName, setChatName] = useState('');

  useEffect(() => {
    async function fetchRooms() { 
      const roomCollection = collection(db, 'rooms');
      const snapshot = await getDocs(roomCollection);
      const docs = snapshot.docs.map(doc => ({
        id:doc.id,
        data:doc.data(),
      }));
      setRooms(docs);
    }
    fetchRooms();
  },[showModal])

  const inputChange = (e) => {
    setChatName(e.target.value);
  }

  const createChat = async () => {
    if (chatName) {
      const addname = collection(db, 'rooms')
      await addDoc(addname, {
        name: chatName
      });
      setShowModal(false);
    }
    else {
      alert('Field cannot be empty.');
    }
  }

  return (
    <>
    <div className='overflow-y-scroll w-full h-full relative '>
      {
        rooms &&
        rooms.map((room) => {
          return(
            <SingleContact id={room.id} name={room.data.name} />
          )
        })
      }
    </div>
    <div className='absolute bottom-4 right-7 cursor-pointer rounded-full p-4 bg-teal-600 hover:bg-teal-500' onClick={() => setShowModal(true)}>
      <BsPlusLg className='w-4 h-4 text-white' />
    </div>
    {
        showModal ?
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-lg text-gray-800 font-semibold">
                      Add New Chat
                    </h3>
                    <button className="ml-auto border-0 float-right outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}>
                      <span className="bg-transparent text-gray-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>

                  <div className="relative p-5 flex-auto">
                    <input onChange={inputChange} type="text" name="name" placeholder='New Chat Name' className='outline-none rounded-md py-2 px-3 border-[1px] border-gray-400 w-full' />
                  </div>
                  <div className="flex items-center justify-end px-5 py-3 border-t border-solid border-slate-200 rounded-b">
                    <button className="text-red-500 background-transparent font-semibold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={() => setShowModal(false)}>Close</button>
                    <button className="bg-emerald-500 text-white active:bg-emerald-600 font-semibold uppercase text-sm px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={createChat}>Add New Chat</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </> : null
      }
    </>
  )
}

export default ContactList