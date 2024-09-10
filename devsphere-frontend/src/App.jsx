import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import LoggedInTest from './components/LoggedInTest'
import LoggedOutTest from './components/LoggedOutTest'


function App() {

  const {isLoggedIn} = useContext(AuthContext)

  return (
    <>
     <BrowserRouter>
        <Routes>
          {isLoggedIn
            ? <Route path="/" element={<LoggedInTest />} />
            : <Route path="/" element={<LoggedOutTest />} />
          }
          <Route path="/login" element={<Login />} />            
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>  
  )
}

export default App
