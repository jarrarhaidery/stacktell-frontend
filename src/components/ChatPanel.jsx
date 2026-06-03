import { useState, useRef, useEffect } from 'react'
import { ArrowRight, Loader2, FileCode } from 'lucide-react'
import { queryRepo } from '../api/client'
import { useRepoStore } from '../hooks/useRepo'

const SUGGESTIONS = [
  'How does this project work overall?',
  'What are the main API endpoints?',
  'How is authentication handled?',
  'Explain the project structure',
]

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: isUser ? 'row-reverse' : 'row' }}>
      <div style={{
        width: '22px', height: '22px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: '9px', fontFamily: "'Geist Mono', monospace",
        background: isUser ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.12)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        color: isUser ? '#555' : '#a5b4fc',
      }}>
        {isUser ? 'SJ' : 'AI'}
      </div>
      <div style={{
        maxWidth: '78%', padding: '10px 14px', fontSize: '13px', lineHeight: 1.6,
        borderRadius: '10px',
        borderTopLeftRadius: isUser ? '10px' : '3px',
        borderTopRightRadius: isUser ? '3px' : '10px',
        background: isUser ? 'rgba(99,102,241,0.08)' : '#111',
        border: `0.5px solid ${isUser ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.06)'}`,
        color: isUser ? '#ccc' : '#aaa',
      }}>
        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
        {msg.sources?.length > 0 && (
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {msg.sources.map((s, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '10px', fontFamily: "'Geist Mono', monospace",
                padding: '2px 7px', borderRadius: '4px',
                background: 'rgba(99,102,241,0.1)', color: '#a5b4fc',
                border: '0.5px solid rgba(99,102,241,0.15)',
              }}>
                <FileCode size={9} />
                {s.file.split('/').pop()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatPanel() {
  const { repoId, messages, addMessage, selectedFile } = useRepoStore()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text) => {
    const q = text || input.trim()
    if (!q || loading || !repoId) return
    setInput('')
    addMessage({ role: 'user', content: q, sources: [] })
    setLoading(true)
    try {
      const res = await queryRepo({ repo_id: repoId, question: q, file_filter: selectedFile || undefined })
      addMessage({ role: 'assistant', content: res.answer, sources: res.sources })
    } catch {
      addMessage({ role: 'assistant', content: 'Something went wrong. Make sure the backend is running on localhost:8000.', sources: [] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808' }}>
      {selectedFile && (
        <div style={{ padding: '6px 16px', borderBottom: '0.5px solid rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.05)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#6366f1', fontFamily: "'Geist Mono', monospace", flexShrink: 0 }}>
          <FileCode size={11} /> scoped to {selectedFile}
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', border: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Loader2 size={11} color="#a5b4fc" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
            <div style={{ padding: '10px 14px', borderRadius: '10px', borderTopLeftRadius: '3px', background: '#111', border: '0.5px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#333', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && !loading && (
        <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              style={{
                fontSize: '11px', padding: '5px 10px', borderRadius: '6px',
                background: 'transparent', border: '0.5px solid rgba(255,255,255,0.08)',
                color: '#555', cursor: 'pointer', transition: 'all 0.15s',
                fontFamily: "'Geist', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ededed'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ padding: '10px 12px', borderTop: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', gap: '8px', flexShrink: 0, background: '#0a0a0a' }}>
        <input
          type="text"
          placeholder={repoId ? 'Ask anything about this codebase...' : 'Index a repo first to start chatting'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          disabled={!repoId || loading}
          style={{
            flex: 1, background: '#0d0d0d',
            border: '0.5px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', padding: '8px 12px',
            fontSize: '13px', color: '#ededed', outline: 'none',
            fontFamily: "'Geist', sans-serif",
            opacity: !repoId ? 0.4 : 1,
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.18)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        />
        <button onClick={() => send()} disabled={!input.trim() || loading || !repoId}
          style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: input.trim() && !loading && repoId ? '#fff' : '#111',
            border: '0.5px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: !input.trim() || loading || !repoId ? 'not-allowed' : 'pointer',
            flexShrink: 0, transition: 'all 0.15s',
          }}>
          <ArrowRight size={14} color={input.trim() && !loading && repoId ? '#080808' : '#333'} />
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 80%, 100% { opacity: 0.2; } 40% { opacity: 1; } }
      `}</style>
    </div>
  )
}