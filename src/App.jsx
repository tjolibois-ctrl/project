import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Register from './pages/Register'
import Profil from './pages/Profil'
import Demandes from './pages/Demandes'
import Messages from './pages/Messages'
import Dashboard from './pages/Dashboard'

/**
 * Layout principal de l'application
 * Contient Sidebar + Navbar + contenu des pages
 */
function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * App principale avec routing
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages publiques */}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/register" element={<Register />} />

        {/* Pages avec layout (sidebar + navbar) */}
        <Route path="/" element={<Layout><Accueil /></Layout>} />
        <Route path="/demandes" element={<Layout><Demandes /></Layout>} />
        <Route path="/messages" element={<Layout><Messages /></Layout>} />
        <Route path="/profil" element={<Layout><Profil /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

        {/* Redirection fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}