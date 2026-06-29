import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteBuild } from '../services/buildsAPI.js'
import { formatPrice, getBuildTier } from '../utilities/calcPrice.js'
import { CASE_COLORS } from '../utilities/options.js'

export default function BuildCard({ build, onDeleted, onEdit }) {
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const navigate = useNavigate()

  const tier = getBuildTier(parseFloat(build.total_price))
  const colorData = CASE_COLORS.find(c => c.value === build.case_color)

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    try {
      await deleteBuild(build.id)
      onDeleted(build.id)
    } catch (err) {
      console.error(err)
      setDeleting(false)
    }
  }

  function handleEdit() {
    navigate(`/build/${build.id}`)
  }

  return (
    <div className="build-card">
      {/* Color stripe */}
      <div className="build-card-stripe" style={{ background: colorData?.hex || '#333' }} />

      <div className="build-card-body">
        <div className="build-card-header">
          <div>
            <h3 className="build-card-name">{build.build_name}</h3>
            <span className="badge" style={{
              background: tier.color + '22',
              color: tier.color,
              border: `1px solid ${tier.color}44`
            }}>
              {tier.label}
            </span>
          </div>
          <div className="build-card-price">{formatPrice(build.total_price)}</div>
        </div>

        <div className="build-specs">
          <div className="spec-row">
            <span className="spec-label">CPU</span>
            <span className="spec-value">{build.cpu}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">GPU</span>
            <span className="spec-value">{build.gpu}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">RAM</span>
            <span className="spec-value">{build.ram}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Storage</span>
            <span className="spec-value">{build.storage}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Cooling</span>
            <span className="spec-value">{build.cooling}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">Case</span>
            <span className="spec-value">
              {colorData && (
                <span style={{
                  display: 'inline-block', width: 9, height: 9,
                  borderRadius: 2, background: colorData.hex,
                  border: '1px solid rgba(255,255,255,0.2)',
                  marginRight: 5, verticalAlign: 'middle'
                }} />
              )}
              {build.case_color}
            </span>
          </div>
        </div>

        <div className="build-card-actions">
          <button className="btn btn-secondary btn-sm" onClick={handleEdit}>
            Edit
          </button>
          <button
            className={`btn btn-sm ${confirmDelete ? 'btn-danger' : 'btn-secondary'}`}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : confirmDelete ? 'Confirm?' : 'Delete'}
          </button>
          {confirmDelete && !deleting && (
            <button className="btn btn-secondary btn-sm" onClick={() => setConfirmDelete(false)}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
