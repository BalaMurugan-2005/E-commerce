
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './webpage/routes/AppRoutes'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {/* Header and Footer are now handled within AppRoutes */}
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App