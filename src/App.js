import React from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route, Routes} from 'react-router-dom' 
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
function App() {
  return (
    <BrowserRouter>
   <NavBar />
   <Routes>
  <Route exact path="/" element={<Home />}>

  </Route>
  <Route exact path="/Signup" element={<Signup />}>
    
  </Route>
  <Route exact path="/login" element={<Login />}>
    
  </Route>
  <Route exact path="/profile" element={ <Profile />}>
   
  </Route>
  <Route exact path="/create" element={ <CreatePost />}>
   
  </Route>
  </Routes>

    </BrowserRouter>
  );
}

export default App;
