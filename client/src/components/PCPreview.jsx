import { CASE_COLORS } from '../utilities/options.js'

export default function PCPreview({ selections }) {
  const { case_color, cpu, gpu, cooling } = selections
  const colorData = CASE_COLORS.find(c => c.value === case_color)
  const caseHex = colorData?.hex || '#1a1a1a'

  // Derive text color for readability
  const isLight = ['Arctic White', 'Titanium'].includes(case_color)
  const textOnCase = isLight ? '#333' : '#ccc'

  // Cooling indicator color
  const hasLiquid = cooling?.includes('Liquid')
  const coolerColor = hasLiquid ? '#2F80ED' : '#888'

  // GPU indicator
  const hasGPU = !!gpu
  const gpuColor = gpu?.includes('NVIDIA') ? '#76b900' : gpu?.includes('AMD') ? '#e0523a' : '#888'

  return (
    <div className="pc-preview-wrapper">
      <svg
        viewBox="0 0 280 380"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', maxWidth: 280, filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.6))' }}
      >
        {/* Case body */}
        <rect x="40" y="20" width="200" height="340" rx="8" fill={caseHex} />

        {/* Case highlight (left edge) */}
        <rect x="40" y="20" width="6" height="340" rx="4" fill="rgba(255,255,255,0.07)" />

        {/* Case border */}
        <rect x="40" y="20" width="200" height="340" rx="8" fill="none"
          stroke={isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />

        {/* Glass panel (right 40%) */}
        <rect x="176" y="20" width="64" height="340" rx="0 8 8 0"
          fill={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'}
          stroke={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'} strokeWidth="1" />

        {/* Power button */}
        <circle cx="72" cy="50" r="7"
          fill={isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'}
          stroke={isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)'} strokeWidth="1" />
        <circle cx="72" cy="50" r="3" fill="#2F80ED" opacity="0.9" />
        {/* Power LED glow */}
        <circle cx="72" cy="50" r="5" fill="none" stroke="#2F80ED" strokeWidth="0.5" opacity="0.6" />

        {/* USB ports */}
        <rect x="85" y="43" width="16" height="8" rx="1"
          fill={isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)'} />
        <rect x="104" y="43" width="16" height="8" rx="1"
          fill={isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)'} />

        {/* === MOTHERBOARD AREA === */}
        <rect x="55" y="75" width="110" height="220" rx="3"
          fill={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.04)'}
          stroke={isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.07)'} strokeWidth="0.75" />

        {/* CPU Socket area */}
        <rect x="65" y="85" width="50" height="50" rx="2"
          fill={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)'} />

        {/* CPU Cooler */}
        {hasLiquid ? (
          <>
            {/* Liquid cooler pump head */}
            <rect x="70" y="90" width="40" height="40" rx="3" fill={coolerColor} opacity="0.25" />
            <rect x="70" y="90" width="40" height="40" rx="3" fill="none"
              stroke={coolerColor} strokeWidth="1.5" opacity="0.7" />
            <text x="90" y="116" textAnchor="middle" fill={coolerColor}
              fontSize="8" fontFamily="Share Tech Mono, monospace" opacity="0.9">AIO</text>
            {/* Tubing */}
            <path d="M 76 90 Q 76 78 95 78 Q 114 78 114 90"
              fill="none" stroke={coolerColor} strokeWidth="2" opacity="0.5" />
          </>
        ) : (
          <>
            {/* Air cooler fins */}
            {[0,4,8,12,16,20,24,28,32,36].map(i => (
              <rect key={i} x={70 + i} y="90" width="2" height="40"
                fill={coolerColor} opacity="0.5" rx="0.5" />
            ))}
          </>
        )}

        {/* RAM slots */}
        <rect x="122" y="85" width="8" height="55" rx="1"
          fill={cpu ? '#2F80ED' : '#333'} opacity={cpu ? 0.8 : 0.3} />
        <rect x="133" y="85" width="8" height="55" rx="1"
          fill={cpu ? '#2F80ED' : '#333'} opacity={cpu ? 0.6 : 0.3} />
        {/* RAM labels */}
        <text x="126" y="146" fill="#2F80ED" fontSize="5" opacity="0.7"
          fontFamily="Share Tech Mono, monospace">RAM</text>

        {/* GPU slot */}
        {hasGPU && (
          <g>
            <rect x="58" y="185" width="105" height="35" rx="2"
              fill={gpuColor} opacity="0.2" />
            <rect x="58" y="185" width="105" height="35" rx="2"
              fill="none" stroke={gpuColor} strokeWidth="1.5" opacity="0.7" />
            {/* GPU fans */}
            <circle cx="85" cy="202" r="11" fill="none"
              stroke={gpuColor} strokeWidth="1.5" opacity="0.6" />
            <circle cx="85" cy="202" r="4"
              fill={gpuColor} opacity="0.4" />
            <circle cx="115" cy="202" r="11" fill="none"
              stroke={gpuColor} strokeWidth="1.5" opacity="0.6" />
            <circle cx="115" cy="202" r="4"
              fill={gpuColor} opacity="0.4" />
            <text x="147" y="206" fill={gpuColor} fontSize="6"
              fontFamily="Share Tech Mono, monospace" opacity="0.9">GPU</text>
          </g>
        )}

        {/* Storage bay */}
        <rect x="58" y="240" width="60" height="18" rx="1"
          fill={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)'}
          stroke={isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.1)'} strokeWidth="0.75" />
        <text x="88" y="252" textAnchor="middle" fill={textOnCase}
          fontSize="5.5" fontFamily="Share Tech Mono, monospace" opacity="0.6">NVMe SSD</text>

        {/* Front fan grille */}
        <rect x="180" y="80" width="45" height="130" rx="3"
          fill={isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.02)'}
          stroke={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)'} strokeWidth="0.75" />
        {/* Fan blades */}
        {[0, 1, 2].map(i => (
          <g key={i}>
            <circle cx="202" cy={100 + i * 36} r="14" fill="none"
              stroke={hasLiquid ? coolerColor : '#555'} strokeWidth="1"
              opacity={hasLiquid ? 0.5 : 0.25} />
            <circle cx="202" cy={100 + i * 36} r="5"
              fill={hasLiquid ? coolerColor : '#555'}
              opacity={hasLiquid ? 0.4 : 0.2} />
          </g>
        ))}

        {/* Bottom PSU area */}
        <rect x="55" y="305" width="105" height="40" rx="2"
          fill={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.04)'}
          stroke={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.06)'} strokeWidth="0.75" />
        <text x="108" y="329" textAnchor="middle" fill={textOnCase}
          fontSize="5.5" fontFamily="Share Tech Mono, monospace" opacity="0.5">PSU</text>

        {/* Ambient glow at bottom */}
        <ellipse cx="140" cy="360" rx="80" ry="8" fill="#2F80ED" opacity="0.06" />
      </svg>

      <div className="pc-preview-labels">
        {selections.case_color && (
          <span className="preview-label">
            <span style={{ background: caseHex, display: 'inline-block', width: 10, height: 10, borderRadius: 2, border: '1px solid rgba(255,255,255,0.2)', marginRight: 5, verticalAlign: 'middle' }}></span>
            {selections.case_color}
          </span>
        )}
        {selections.cooling && (
          <span className="preview-label" style={{ color: coolerColor }}>
            {hasLiquid ? '❄️' : '💨'} {selections.cooling}
          </span>
        )}
        {selections.gpu && (
          <span className="preview-label" style={{ color: gpuColor }}>
            ⚡ {selections.gpu}
          </span>
        )}
      </div>
    </div>
  )
}
