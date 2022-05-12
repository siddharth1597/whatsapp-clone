import React, {useEffect, useState, useRef} from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

import {
  BsThreeDotsVertical,
  BsSearch,
  BsEmojiSmile,
  BsFillMicFill,
  BsCheck2
} from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { useParams } from 'react-router-dom';

import { addDoc, collection, doc, getDoc, serverTimestamp, getDocs, orderBy, query } from 'firebase/firestore';
import db from '../firebase';
import { useStateProvider } from '../utilities/StateProvider';

function RightSide() {
  const { roomId, seedId } = useParams();
  const [profileName, setProfileName] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [{user}] = useStateProvider();
  const scrollRef = useRef(null);

  //For emojis
  const [showEmojis, setShowEmojis] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  useEffect(() => {

    async function getDetails() {
      const docRef =  doc(db, "rooms", roomId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setProfileName(docSnap.data().name);
      } else {
        console.log("No such document!");
      }
    }

    async function getMessage() {
      const messagedb = collection(db, 'rooms', roomId, 'messages');
      const orderedList = query(messagedb, orderBy('timestamp', 'asc'));
      const getList = await getDocs(orderedList);

      const data = getList.docs.map(doc => doc.data());
      setMessages(data)
    } 

    if (roomId) {
      getDetails();
      getMessage();

      if(messages) {
        scrollRef.current.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'end'
          })
      }
    }

  },[roomId, input])

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please type message');
    }

    const database = collection(db, 'rooms', roomId, 'messages');
    await addDoc(database, {
      name: user.displayName,
      emailId: user.email,
      message: input,
      timestamp: serverTimestamp(),
    });

    setInput('');
  }

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    if (chosenEmoji) {
      setInput(input => `${input}${chosenEmoji.emoji}`);
    }
  };

  return (
    <div className='flex-1 w-full flex flex-col'>
      <div className='relative h-[10%]'>
        <div className='flex w-full justify-between items-center px-4 py-3 bg-gray-100'>
          <div className="flex space-x-4 items-center">
            <img src={`https://avatars.dicebear.com/api/human/${seedId}.svg`} alt="profile" className='rounded-full w-10 h-10' />
            <div className='flex flex-col'>
              <h3 className='font-semibold'>{profileName}</h3>
              <small className='text-gray-500 text-xs'>
              {
                messages.length > 0 &&
                'Last seen ' + (new Date(messages[messages.length - 1].timestamp?.seconds * 1000).toLocaleTimeString()).split(':')[0] + ':' +  
                (new Date(messages[messages.length - 1].timestamp?.seconds * 1000).toLocaleTimeString()).split(':')[1] + ' ' +
                (new Date(messages[messages.length - 1].timestamp?.seconds * 1000).toLocaleTimeString()).split(' ')[1]
              }
              </small>
            </div>        
          </div>
          <div className='flex space-x-5'>
            <BsSearch className='w-4 h-4 text-gray-600 cursor-pointer' />
            <BsThreeDotsVertical className='w-4 h-4 text-gray-600 cursor-pointer' />
          </div>
        </div>
      </div>

      <div className='background-wall px-16 py-2 space-y-1 overflow-y-scroll h-[80%]'>
        {
          messages && 
          messages.map((data, index) => {
            return(
              <div key={index} className={`w-fit flex flex-col rounded-md py-1 px-2 shadow-sm ${user.email === data.emailId ? "bg-emerald-100 ml-auto" : "bg-white mr-auto"}  `}>
                <h4 className='text-xs text-orange-700 font-semibold'>{data.name}</h4>
                <div className='flex items-end space-x-4 max-w-[23rem]'>
                  <h3 className='text-md'>{data.message}</h3>
                  <div className='space-x-2 flex items-end min-w-[5rem]'>
                    <small className='text-xs text-gray-600 items-end'>
                      {
                        data?.timestamp?.seconds &&
                        (new Date(data.timestamp.seconds * 1000).toLocaleTimeString()).split(':')[0] + ':' +  
                        (new Date(data.timestamp.seconds * 1000).toLocaleTimeString()).split(':')[1] + ' ' +
                        (new Date(data.timestamp.seconds * 1000).toLocaleTimeString()).split(' ')[1]
                      }
                    </small>
                    {
                      user.email === data.emailId ?
                        <BsCheck2 className='w-4 h-4 text-gray-400' /> 
                      : ''
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
        <div id={'scrollRef'} ref={scrollRef}>
       </div>
      </div>


      <div className='w-full flex relative bottom-0 h-[10%]'>
        <div className='flex w-full space-x-3 items-center py-2 px-4 bg-gray-100 '>
          <BsEmojiSmile className='w-5 h-5 text-gray-600 cursor-pointer' onClick={e=>setShowEmojis(!showEmojis)} />
          {
            showEmojis &&
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: 'PEOPLE' }}
              native
            />
          }
          <ImAttachment className='w-5 h-5 text-gray-600 cursor-pointer' />
          <form  className='p-2 w-full flex space-x-2' onSubmit={sendMessage}>
            <div className=' w-full'>
              <input type="text" value={input} onChange={e => setInput(e.target.value)} className='rounded-md bg-white text-gray-800 placeholder:text-gray-600 p-2 w-full focus:outline-none' placeholder='Type a message' />
            </div>
            <input type="submit"  value='' />
          </form>
          <BsFillMicFill className='w-5 h-5 text-gray-600 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default RightSide