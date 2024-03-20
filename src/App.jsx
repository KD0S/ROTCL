import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Dashboard from './Pages/Dashboard'
import { useState } from 'react'


const App = () => {
  const [username, setUsername] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Routes>
      <Route path="/" element={<LoginPage setUsername={setUsername} authentication={setIsAuthenticated}></LoginPage>}></Route>
      <Route path='/home' >
        <Route path='dashboard' element={isAuthenticated ? <Dashboard uid={username}></Dashboard> : <Navigate to={'/'}></Navigate>}></Route>
      </Route>
    </Routes>
  )
}

export default App