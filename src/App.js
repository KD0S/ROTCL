import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import Register from './components/Register'
import { Layout } from './components/Layout'
import RequireAuth from './components/RequireAuth'
import PersistLogin from './components/PersistLogin'
import Home from './Pages/Home'

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