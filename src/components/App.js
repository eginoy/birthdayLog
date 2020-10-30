import React from 'react'
import '../styles/App.module.css';
import Header from './Header';
import Login from './Login'
import ListView from './ListView.js';
import PresentRegister from './PresentRegister';
import UserRegister from './UserRegister'
import { UserProvider } from '../store/index'
import { Link, BrowserRouter, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Route exact path='/' component={ListView}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/userRegist' component={UserRegister}></Route>
          <Route path='/presentRegist' component={PresentRegister}></Route>
          <Route path='/eventList' component={ListView}></Route>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
