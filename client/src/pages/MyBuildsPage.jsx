import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BuildCard from '../components/BuildCard.jsx'
import { getAllBuilds } from '../services/buildsAPI.js'
import './MyBuildsPage.css'

export default function MyBuildsPage() {
  const [builds, setBuilds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllBuilds()
        setBuilds(data)
      } catch (err) {
        setError('Failed to load builds. Make sure the server is running and your database is connected.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  function handleDeleted(id) {
    setBuilds(prev => prev.filter(b => b.id !== id))
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner" />
        <span>Fetching builds...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="my-builds-header">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h1>
            <span className="prefix">// list</span>
            My Builds
          </h1>
          <p>{builds.length} saved configuration{builds.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/build')}>
          + New Build
        </button>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <span>⚠</span> {error}
        </div>
      )}

      {builds.length === 0 && !error ? (
        <div className="empty-state">
          <div className="empty-icon">🖥️</div>
          <h3>No builds yet</h3>
          <p>Configure your first PC and save it here.</p>
          <button className="btn btn-primary" onClick={() => navigate('/build')}>
            Start Building
          </button>
        </div>
      ) : (
        <div className="builds-grid">
          {builds.map(build => (
            <BuildCard
              key={build.id}
              build={build}
              onDeleted={handleDeleted}
            />
          ))}
        </div>
      )}
    </div>
  )
}
