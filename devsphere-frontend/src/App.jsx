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
import ProjectEditForm from './pages/ProjectEditForm.jsx'
import Chat from './pages/Chat.jsx'


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
          <Route path="/project-form/:id" element={<ProjectEditForm />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/users/edit/:id" element={<UserEditForm />} />
          <Route path="/chats" element={<Chat />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>  
  )
}

export default App
