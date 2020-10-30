import React from 'react'
import '../styles/App.module.css';
import Header from './Header';
import Login from './Login'
import ListView from './ListView.js';
import PresentRegister from './PresentRegister';
import UserRegister from './UserRegister'
import ErrorDialog from './ErrorDialog'
import { UserProvider } from '../store/index'
import { Link, Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Switch>
          <Route exact path='/' component={ListView}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/userRegist' component={UserRegister}></Route>
          <Route path='/presentRegist' component={PresentRegister}></Route>
          <Route path='/eventList' component={ListView}></Route>
          <Route>
            <ErrorDialog />
          </Route>
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
