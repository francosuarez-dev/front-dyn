import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import EventosPage from './pages/EventosPage'
import EventoPage from './pages/EventoPage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import CuentaPage from './pages/CuentaPage'
import './App.css'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path='/'
          element={
            <HomePage />
          }
        />
        <Route
          path='/eventos'
          element={
            <EventosPage />
          }
        />
        <Route
          path='/evento/:id'
          element={
            <EventoPage />
          }
        />
        <Route
          path='/cuenta'
          element={
            <CuentaPage />
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage />
          }
        />
        <Route
          path='/registro'
          element={
            <RegistroPage />
          }
        />
      </Route>
    </Routes>
  )
}

export default App
