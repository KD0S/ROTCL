import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Register from './components/Register'
import Dashboard from './Pages/Dashboard'
import { Layout } from './components/Layout'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}></Route>

      {/* public routes */}
      <Route element={<PersistLogin />}>
        <Route path="login" element={<LoginPage />} />
        <Route path='register' element={<Register />} />
      </Route>

      {/* protected routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App