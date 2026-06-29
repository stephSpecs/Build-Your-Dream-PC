import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PCPreview from '../components/PCPreview.jsx'
import { createBuild, getBuildById, updateBuild } from '../services/buildsAPI.js'
import { calculateTotalPrice, formatPrice, validateBuild } from '../utilities/calcPrice.js'
import {
  CPUS, GPUS, RAM_OPTIONS, STORAGE_OPTIONS,
  CASE_COLORS, COOLING_OPTIONS, PSU_OPTIONS
} from '../utilities/options.js'
import './BuildPage.css'

const DEFAULT_SELECTIONS = {
  build_name: '',
  cpu: '',
  gpu: '',
  ram: '',
  storage: '',
  case_color: 'Midnight Black',
  cooling: '',
  psu: ''
}

export default function BuildPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [selections, setSelections] = useState(DEFAULT_SELECTIONS)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetchingBuild, setFetchingBuild] = useState(isEditing)

  // Load build if editing
  useEffect(() => {
    if (!isEditing) return
    async function load() {
      try {
        const build = await getBuildById(id)
        setSelections({
          build_name: build.build_name,
          cpu: build.cpu,
          gpu: build.gpu,
          ram: build.ram,
          storage: build.storage,
          case_color: build.case_color,
          cooling: build.cooling,
          psu: build.psu
        })
      } catch (err) {
        setError('Could not load build.')
      } finally {
        setFetchingBuild(false)
      }
    }
    load()
  }, [id, isEditing])

  const totalPrice = calculateTotalPrice(selections)

  function handleChange(field, value) {
    setSelections(prev => ({ ...prev, [field]: value }))
    setError('')
    setSuccess('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Check all fields
    const requiredFields = ['build_name','cpu','gpu','ram','storage','case_color','cooling','psu']
    for (const f of requiredFields) {
      if (!selections[f]) {
        setError('Please fill out all fields before saving your build.')
        return
      }
    }

    // Validate compatibility
    const validationError = validateBuild(selections)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const payload = { ...selections, total_price: totalPrice }
      if (isEditing) {
        await updateBuild(id, payload)
        setSuccess('Build updated successfully!')
      } else {
        await createBuild(payload)
        setSuccess('Build saved!')
        setTimeout(() => navigate('/my-builds'), 800)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setSelections(DEFAULT_SELECTIONS)
    setError('')
    setSuccess('')
  }

  if (fetchingBuild) {
    return <div className="loading"><div className="spinner"/><span>Loading build...</span></div>
  }

  const isComplete = Object.values(selections).every(v => v !== '')
  const tierPrice = totalPrice

  return (
    <div className="build-page">
      <div className="build-page-left">
        <div className="page-header">
          <h1>
            <span className="prefix">// configure</span>
            {isEditing ? 'Edit Build' : 'New Build'}
          </h1>
          <p>{isEditing ? 'Update your saved configuration' : 'Pick your components, see it live'}</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠</span> {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            <span>✓</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="build-form">

          {/* Build Name */}
          <div className="form-section">
            <div className="form-section-title">Identity</div>
            <div className="form-group">
              <label className="form-label">Build Name</label>
              <input
                className="form-input"
                type="text"
                placeholder='e.g. "The Destroyer" or "Budget Daily"'
                value={selections.build_name}
                onChange={e => handleChange('build_name', e.target.value)}
                maxLength={100}
              />
            </div>
          </div>

          {/* CPU */}
          <div className="form-section">
            <div className="form-section-title">Processor</div>
            <div className="form-group">
              <label className="form-label">CPU</label>
              <select className="form-select" value={selections.cpu}
                onChange={e => handleChange('cpu', e.target.value)}>
                <option value="">Select CPU...</option>
                {CPUS.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.label} — {formatPrice(c.price)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* GPU */}
          <div className="form-section">
            <div className="form-section-title">Graphics</div>
            <div className="form-group">
              <label className="form-label">GPU</label>
              <select className="form-select" value={selections.gpu}
                onChange={e => handleChange('gpu', e.target.value)}>
                <option value="">Select GPU...</option>
                {GPUS.map(g => (
                  <option key={g.value} value={g.value}>
                    {g.label} — {formatPrice(g.price)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* RAM + Storage */}
          <div className="form-section">
            <div className="form-section-title">Memory & Storage</div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">RAM</label>
                <select className="form-select" value={selections.ram}
                  onChange={e => handleChange('ram', e.target.value)}>
                  <option value="">Select RAM...</option>
                  {RAM_OPTIONS.map(r => (
                    <option key={r.value} value={r.value}>
                      {r.label} — {formatPrice(r.price)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Storage</label>
                <select className="form-select" value={selections.storage}
                  onChange={e => handleChange('storage', e.target.value)}>
                  <option value="">Select Storage...</option>
                  {STORAGE_OPTIONS.map(s => (
                    <option key={s.value} value={s.value}>
                      {s.label} — {formatPrice(s.price)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Case Color */}
          <div className="form-section">
            <div className="form-section-title">Case</div>
            <div className="form-group">
              <label className="form-label">Color</label>
              <div className="color-options">
                {CASE_COLORS.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    className={`color-swatch ${selections.case_color === c.value ? 'selected' : ''}`}
                    style={{ '--swatch-color': c.hex }}
                    onClick={() => handleChange('case_color', c.value)}
                    title={`${c.label}${c.price > 0 ? ` (+${formatPrice(c.price)})` : ''}`}
                  >
                    <span className="swatch-dot" />
                    <span className="swatch-name">{c.label}</span>
                    {c.price > 0 && <span className="swatch-price">+{formatPrice(c.price)}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cooling + PSU */}
          <div className="form-section">
            <div className="form-section-title">Thermal & Power</div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Cooling</label>
                <select className="form-select" value={selections.cooling}
                  onChange={e => handleChange('cooling', e.target.value)}>
                  <option value="">Select Cooling...</option>
                  {COOLING_OPTIONS.map(c => (
                    <option key={c.value} value={c.value}>
                      {c.label} — {formatPrice(c.price)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Power Supply</label>
                <select className="form-select" value={selections.psu}
                  onChange={e => handleChange('psu', e.target.value)}>
                  <option value="">Select PSU...</option>
                  {PSU_OPTIONS.map(p => (
                    <option key={p.value} value={p.value}>
                      {p.label} — {formatPrice(p.price)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Build' : 'Save Build'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/my-builds')}>
              ← My Builds
            </button>
          </div>

        </form>
      </div>

      {/* Right panel: Live preview + price */}
      <div className="build-page-right">
        <div className="preview-panel card">
          <div className="preview-panel-header">
            <span className="preview-panel-title">Live Preview</span>
            {isComplete && <span className="badge badge-blue">All set</span>}
          </div>

          <PCPreview selections={selections} />

          <div className="price-breakdown">
            <div className="price-line-items">
              {[
                { label: 'CPU', list: CPUS, val: selections.cpu },
                { label: 'GPU', list: GPUS, val: selections.gpu },
                { label: 'RAM', list: RAM_OPTIONS, val: selections.ram },
                { label: 'Storage', list: STORAGE_OPTIONS, val: selections.storage },
                { label: 'Case', list: CASE_COLORS, val: selections.case_color },
                { label: 'Cooling', list: COOLING_OPTIONS, val: selections.cooling },
                { label: 'PSU', list: PSU_OPTIONS, val: selections.psu },
              ].map(({ label, list, val }) => {
                const opt = list.find(o => o.value === val)
                return opt ? (
                  <div key={label} className="price-line">
                    <span className="price-line-label">{label}</span>
                    <span className="price-line-val">{formatPrice(opt.price)}</span>
                  </div>
                ) : null
              })}
            </div>
            <div className="price-total">
              <span>Total</span>
              <span className="price-total-val">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
