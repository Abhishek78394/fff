import React from 'react';
import { Routes,Route } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher';
 import Login from './Components/Login'
import Insert from './Components/Insert';
import Sucees from './Components/Sucees';
import Show from './Components/Show';
import Header from './Components/Header';
import Data from './Components/Data';
import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './Components/Home';

 
function App() {
  const { isAuthenticated } = useSelector((state) => state.root);
  console.log(isAuthenticated)
  return (
    <>
    <ColorModeSwitcher/>

    <Header/>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/Sucees' element={<Sucees />} />
      <Route path='/insert' element={<Insert/>} />
      {/* <Route path='/admin' element={<AdminLogin />} /> */}
     

      
      <Route
          path="/data"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Data />
            </ProtectedRoute>
          }
          />
            <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Home />
            </ProtectedRoute>
          }
          />

<Route
          path="/show"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true}>
              <Show />
            </ProtectedRoute>
          }
          />
    </Routes>
    </>
  );
}

export default App;
