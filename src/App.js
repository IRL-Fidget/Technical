import React, { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProtectedRoute from "components/ProtectedRoute";

import Login from 'views/Login';
import Contents from 'views/Contents';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [auth, setAuth] = useState(false);


  const handleLogout = (e) => {
    e.preventDefault();
    setAuth(false);
  }

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Route exact path='/' render={
            props => 
              <Login {...props} setAuth={setAuth}/>
          } 
        />
        <ProtectedRoute exact path='/contents' user={auth} handleLogin={handleLogout} component={Contents} />
      </Router>
    </div>
  );
}

export default App;
