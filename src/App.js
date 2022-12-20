import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';

// pages & components
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'

import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home/>}
            />
            <Route 
              path="/login"
              element={<Login/>}
            />
            <Route 
              path="/signup"
              element={<Signup/>}
            />
          </Routes>
          <div>
            
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App