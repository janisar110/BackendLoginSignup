import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Todo from './pages/Todo'
import AuthRoutes from './routes/AuthRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthRoutes/>}>
          <Route index element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path='/Todo' element={<Todo />} />
        </Route>
        </Routes>
      </>
      )
}

      export default App
