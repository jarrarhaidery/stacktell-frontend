import { useState } from 'react'
import { Github, Loader2 } from 'lucide-react'

export default function RepoInput({ onIndex, isIndexing }) {
  const [url, setUrl] = useState('')
  const [branch, setBranch] = useState('main')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = () => {
    if (!url.trim() || isIndexing) return
    onIndex({ repo_url: url.trim(), branch })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Github size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#333', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="https://github.com/user/repo"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%',
              background: '#0d0d0d',
              border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '7px',
              padding: '7px 10px 7px 30px',
              fontSize: '12px',
              fontFamily: "'Geist Mono', monospace",
              color: '#ededed',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isIndexing || !url.trim()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '7px',
            fontSize: '12px', fontWeight: 500,
            background: isIndexing || !url.trim() ? '#1a1a1a' : '#fff',
            color: isIndexing || !url.trim() ? '#444' : '#080808',
            border: '0.5px solid rgba(255,255,255,0.08)',
            cursor: isIndexing || !url.trim() ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap', transition: 'all 0.15s',
            fontFamily: "'Geist', sans-serif",
          }}>
          {isIndexing
            ? <><Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> Indexing...</>
            : 'Index repo'}
        </button>
      </div>

      {showAdvanced && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '2px' }}>
          <span style={{ fontSize: '11px', color: '#444', fontFamily: "'Geist Mono', monospace" }}>branch:</span>
          <input
            type="text"
            value={branch}
            onChange={e => setBranch(e.target.value)}
            style={{
              background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)',
              borderRadius: '5px', padding: '3px 8px',
              fontSize: '11px', color: '#888', outline: 'none',
              fontFamily: "'Geist Mono', monospace", width: '80px',
            }}
          />
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}