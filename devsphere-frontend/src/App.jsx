import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import LoggedInTest from './components/LoggedInTest'
import ProjectForm from './pages/ProjectForm'
import ProjectPage from './pages/ProjectPage'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext.jsx'


function App() {



  return (
    <>
     <BrowserRouter>
     <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/" element={<LoggedInTest />} />
          </Route>
          <Route path="/login" element={<Login />} />            
          <Route path="/register" element={<Register />} />
          <Route path="/project-form" element={<ProjectForm />} />
          <Route path="/project:id" element={<ProjectPage />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>  
  )
}

export default App
