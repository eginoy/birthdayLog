import React from 'react'
import '../styles/App.module.css';
import Header from './Header';
import Login from './Login'
import ListView from './ListView.js';
import PresentRegister from './PresentRegister';
import UserRegister from './UserRegister'
import { UserProvider } from '../store/index'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

function App() {

  return (
    <div>
        <UserProvider>
          <Header />
          <Login />
          <UserRegister />
          <PresentRegister />
          <ListView />
        </UserProvider>
    </div>
  );
}

export default App;
