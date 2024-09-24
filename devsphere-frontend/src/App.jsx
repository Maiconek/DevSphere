import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ProjectForm from './pages/ProjectForm'
import ProjectPage from './pages/ProjectPage'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext.jsx'
import UsersList from './components/UsersList.jsx'
import UserPage from './pages/UserPage.jsx'
import MainPage from './components/MainPage.jsx'
import UserEditForm from './pages/UserEditForm.jsx'
import Header from './components/Header.jsx'


function App() {
  return (
    <>
     <BrowserRouter>
     <AuthProvider>
     <Header />
       <Routes>
          <Route path="/" element={<PrivateRoute />} >
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<Login />} />            
          <Route path="/register" element={<Register />} />
          <Route path="/project-form" element={<ProjectForm />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/edit" element={<UserEditForm />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>  
  )
}

export default App
