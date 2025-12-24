import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './webpage/routes/AppRoutes'
import Header from './webpage/components/common/Header'
import Footer from './webpage/components/common/Footer'


function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App