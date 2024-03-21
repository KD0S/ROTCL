import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Register from './components/Register'
import Dashboard from './Pages/Dashboard'
import { Layout } from './components/Layout'
import RequireAuth from './components/RequireAuth'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}></Route>

      {/* public routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path='register' element={<Register />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>

    </Routes>
  )
}

export default App