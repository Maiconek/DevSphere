import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProjectForm from './pages/ProjectForm'
import ProjectPage from './pages/ProjectPage'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext.jsx'
import UsersList from './components/UsersList.jsx'
import MainPage from './components/MainPage.jsx'


function App() {



  return (
    <>
     <BrowserRouter>
     <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<Login />} />            
          <Route path="/register" element={<Register />} />
          <Route path="/project-form" element={<ProjectForm />} />
          <Route path="/project:id" element={<ProjectPage />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>  
  )
}

export default App
