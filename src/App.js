import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Register from './components/Register'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
import Home from './Pages/Home'

const App = () => {
  return (
    <Routes>

      {/* public routes */}
      <Route element={<PersistLogin />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='register' element={<Register />} />
      </Route>

      {/* protected routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
              <Route path='dashboard'>
                <Route index element={<Home page={'dashboard'} />}/> 
                <Route path='monsters' element={<Home page={'monsterPage'}/>} />
                <Route path='leaderboard' element={<Home page={'leaderboard'} />} />
              </Route>
        </Route>  
      </Route>

    </Routes>
  )
}

export default App