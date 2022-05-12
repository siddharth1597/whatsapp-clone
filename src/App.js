import './App.css';
import LeftSide from './Components/LeftSide';
import RightSide from './Components/RightSide';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { useStateProvider } from './utilities/StateProvider';
import { useEffect } from 'react';
import { auth } from './firebase';
import { reducerCases } from './utilities/Constants';

function App() {
  const [{user}, dispatch] = useStateProvider();
  
  
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      dispatch({ type: reducerCases.SET_USER, user:user })
    });
  }, []);
  
  return (
    <Router>
      {
        !user ? <Login /> : (
        <div className="h-screen w-screen bg-gray-200 py-10 px-10 sm:px-20 overflow-hidden">
          <div className='absolute top-0 left-0 w-full bg-teal-600 h-44'></div>
          <div className= 'flex shadow-lg h-full w-full bg-white relative overflow-hidden'>
            <LeftSide />

            <Routes>
              <Route path="/" exact element={<RightSide />} />

              <Route path="/room/:roomId/:seedId" element={<RightSide />} />
            </Routes>
            
          </div>
        </div>
        )
      }
    </Router>
  );
}

export default App;
