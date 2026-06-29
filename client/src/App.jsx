import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import BuildPage from './pages/BuildPage.jsx'
import MyBuildsPage from './pages/MyBuildsPage.jsx'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo">
        &lt;<span>PC</span>Builder /&gt;
      </NavLink>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/build">New Build</NavLink></li>
        <li><NavLink to="/my-builds">My Builds</NavLink></li>
      </ul>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/build/:id" element={<BuildPage />} />
            <Route path="/my-builds" element={<MyBuildsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
