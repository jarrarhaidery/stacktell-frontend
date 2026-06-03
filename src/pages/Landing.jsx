import { useNavigate } from 'react-router-dom'
import { ArrowRight, Github, GitBranch, MessageSquare, FileText, Zap, BookOpen, ChevronRight } from 'lucide-react'

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Codebase chat',
    desc: 'Ask anything in plain English. Get answers with exact file paths, function names, and line references.',
    tag: 'RAG',
  },
  {
    icon: FileText,
    title: 'Auto documentation',
    desc: 'Click any file in the tree. Get full markdown docs with signatures, params, and return types — instantly.',
    tag: 'LLM',
  },
  {
    icon: BookOpen,
    title: 'Onboarding guides',
    desc: 'Generate a structured developer guide covering setup, architecture, entry points and common tasks.',
    tag: 'Agentic',
  },
  {
    icon: Zap,
    title: 'Local embeddings',
    desc: 'FAISS + Sentence Transformers runs entirely on your machine. No third-party embedding API costs.',
    tag: 'FAISS',
  },
]

const STACK = [
  { label: 'LangChain', color: '#22c55e' },
  { label: 'FAISS', color: '#6366f1' },
  { label: 'Groq LLaMA', color: '#f59e0b' },
  { label: 'FastAPI', color: '#06b6d4' },
  { label: 'React', color: '#38bdf8' },
  { label: 'Sentence Transformers', color: '#a78bfa' },
]

const DEMO_MESSAGES = [
  { role: 'user', text: 'How does the RAG pipeline work?' },
  { role: 'ai',   text: 'Starts in', file: 'rag_pipeline.py', rest: ' at ingest(). Loads docs via LangChain\'s PyPDFLoader → splits with RecursiveCharacterTextSplitter → stores embeddings in FAISS. Queries hit /query in main.py and retrieve top-k chunks before calling the LLM.' },
  { role: 'user', text: 'Where is auth handled?' },
  { role: 'ai',   text: 'Auth lives in', file: 'auth.py', rest: '. JWT tokens — issued via create_access_token() on login, verified with a FastAPI dependency get_current_user() injected into protected routes.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: '#ededed', fontFamily: "'Geist', system-ui, sans-serif" }}>

      {/* Nav */}
      <nav style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'sticky', top: 0, background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(12px)', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', background: '#fff', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2h3v3H2zM7 2h3v3H7zM2 7h3v3H2zM7 7h3v3H7z" fill="#080808" />
            </svg>
          </div>
          <span style={{ fontWeight: 500, fontSize: '14px', letterSpacing: '-0.02em' }}>Stacktell</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <a href="https://github.com/jarrarhaidery" target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', color: '#888', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ededed'}
            onMouseLeave={e => e.currentTarget.style.color = '#888'}>
            <Github size={14} /> GitHub
          </a>
          <button onClick={() => navigate('/app')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: '#fff', color: '#080808', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Open app <ArrowRight size={13} />
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <section style={{ padding: '100px 0 80px', maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '99px', border: '0.5px solid rgba(255,255,255,0.1)', fontSize: '12px', color: '#888', marginBottom: '32px', fontFamily: "'Geist Mono', monospace" }}>
            <span className="accent-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', display: 'inline-block' }} />
            v1.0 — open source
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 58px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '24px', color: '#fff' }}>
            Understand any<br />
            <span style={{ background: 'linear-gradient(135deg, #fff 0%, #555 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              codebase instantly
            </span>
          </h1>

          <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#666', marginBottom: '36px', maxWidth: '460px' }}>
            Paste a GitHub URL. Stacktell indexes the repo, embeds it locally,
            and lets you chat, generate docs, and onboard new devs — all in one place.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => navigate('/app')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, background: '#fff', color: '#080808', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
              Try Stacktell <ArrowRight size={14} />
            </button>
            <a href="https://github.com/jarrarhaidery/stacktell-backend" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', fontSize: '14px', color: '#888', textDecoration: 'none', border: '0.5px solid rgba(255,255,255,0.1)', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ededed'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>
              <Github size={14} /> Star on GitHub
            </a>
          </div>
        </section>

        {/* Demo window */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '14px', overflow: 'hidden', background: '#0d0d0d' }}>
            {/* Titlebar */}
            <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', background: '#0a0a0a' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['#ff5f57','#febc2e','#28c840'].map(c => (
                  <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 12px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)', fontSize: '11px', fontFamily: "'Geist Mono', monospace", color: '#555' }}>
                  stacktell.vercel.app/app
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontFamily: "'Geist Mono', monospace", color: '#333' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                indexed
              </div>
            </div>

            {/* App layout preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '380px' }}>
              {/* Sidebar */}
              <div style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)', padding: '12px 0', overflow: 'hidden' }}>
                <div style={{ padding: '0 12px 10px', borderBottom: '0.5px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '11px', color: '#444', fontFamily: "'Geist Mono', monospace", marginBottom: '4px' }}>repo</div>
                  <div style={{ fontSize: '12px', color: '#aaa', fontWeight: 500, letterSpacing: '-0.02em' }}>university-ai-assistant</div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                    {[['34', 'files'], ['812', 'chunks']].map(([n, l]) => (
                      <div key={l} style={{ fontSize: '10px', color: '#444' }}><span style={{ color: '#888', fontFamily: "'Geist Mono', monospace" }}>{n}</span> {l}</div>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '10px 8px', fontSize: '11px', fontFamily: "'Geist Mono', monospace" }}>
                  {[
                    { name: 'app/', indent: 0, type: 'dir' },
                    { name: 'main.py', indent: 1, type: 'file' },
                    { name: 'rag_pipeline.py', indent: 1, type: 'file', active: true },
                    { name: 'auth.py', indent: 1, type: 'file' },
                    { name: 'models.py', indent: 1, type: 'file' },
                    { name: 'frontend/', indent: 0, type: 'dir' },
                    { name: 'App.jsx', indent: 1, type: 'file' },
                  ].map((f, i) => (
                    <div key={i} style={{ padding: '2px 0', paddingLeft: `${f.indent * 12}px`, display: 'flex', alignItems: 'center', gap: '5px', borderRadius: '4px', background: f.active ? 'rgba(99,102,241,0.1)' : 'transparent', color: f.active ? '#a5b4fc' : f.type === 'dir' ? '#555' : '#555', marginBottom: '1px' }}>
                      <span style={{ color: f.type === 'dir' ? '#6366f1' : f.active ? '#a5b4fc' : '#333' }}>
                        {f.type === 'dir' ? '▸' : '·'}
                      </span>
                      {f.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)', display: 'flex' }}>
                  {['Chat', 'Docs', 'Onboarding'].map((t, i) => (
                    <div key={t} style={{ padding: '10px 16px', fontSize: '12px', color: i === 0 ? '#ededed' : '#444', borderBottom: i === 0 ? '1px solid #6366f1' : '1px solid transparent', cursor: 'default' }}>{t}</div>
                  ))}
                </div>
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'hidden' }}>
                  {DEMO_MESSAGES.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, background: m.role === 'ai' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: m.role === 'ai' ? '#a5b4fc' : '#666', fontFamily: "'Geist Mono', monospace" }}>
                        {m.role === 'ai' ? 'AI' : 'SJ'}
                      </div>
                      <div style={{ maxWidth: '75%', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', lineHeight: 1.55, background: m.role === 'ai' ? '#111' : 'rgba(99,102,241,0.08)', border: `0.5px solid ${m.role === 'ai' ? 'rgba(255,255,255,0.06)' : 'rgba(99,102,241,0.15)'}`, color: m.role === 'ai' ? '#aaa' : '#ccc', borderTopLeftRadius: m.role === 'ai' ? '2px' : '10px', borderTopRightRadius: m.role === 'user' ? '2px' : '10px' }}>
                        {m.role === 'ai' ? (
                          <span>{m.text} <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: '10px', padding: '1px 5px', borderRadius: '3px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '0.5px solid rgba(99,102,241,0.2)' }}>{m.file}</span>{m.rest}</span>
                        ) : m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '10px 12px', borderTop: '0.5px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: '#333', fontFamily: "'Geist', sans-serif" }}>
                    Ask anything about this codebase...
                  </div>
                  <div style={{ width: '30px', height: '30px', background: '#fff', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ArrowRight size={13} color="#080808" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ marginBottom: '100px' }}>
          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontSize: '11px', fontFamily: "'Geist Mono', monospace", color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Features</div>
            <h2 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.03em', color: '#fff', maxWidth: '400px', lineHeight: 1.2 }}>
              Everything you need to navigate unfamiliar code
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.06)' }}>
            {FEATURES.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title} style={{ background: '#080808', padding: '28px', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0d0d0d'}
                onMouseLeave={e => e.currentTarget.style.background = '#080808'}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color="#888" />
                  </div>
                  <span style={{ fontSize: '10px', fontFamily: "'Geist Mono', monospace", color: '#444', padding: '3px 7px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.06)' }}>{tag}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#ededed', marginBottom: '8px', letterSpacing: '-0.02em' }}>{title}</div>
                <div style={{ fontSize: '13px', color: '#555', lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section style={{ marginBottom: '100px', paddingTop: '60px', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '11px', fontFamily: "'Geist Mono', monospace", color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>Built with</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {STACK.map(({ label, color }) => (
              <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '6px 12px', borderRadius: '8px', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', fontSize: '12px', color: '#888', fontFamily: "'Geist Mono', monospace" }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginBottom: '80px', padding: '60px', borderRadius: '14px', background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 600, letterSpacing: '-0.03em', color: '#fff', marginBottom: '12px' }}>Ready to understand your codebase?</h2>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '28px' }}>Free. Open source. No API costs.</p>
          <button onClick={() => navigate('/app')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 500, background: '#fff', color: '#080808', border: 'none', cursor: 'pointer', letterSpacing: '-0.01em' }}>
            Get started <ArrowRight size={14} />
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', padding: '24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2 2h3v3H2zM7 2h3v3H7zM2 7h3v3H2zM7 7h3v3H7z" fill="#080808" />
              </svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#ededed', letterSpacing: '-0.02em' }}>Stacktell</span>
          </div>
          <span style={{ fontSize: '12px', color: '#333' }}>
            Built by{' '}
            <a href="https://linkedin.com/in/jarrarhaidery" target="_blank" rel="noreferrer"
              style={{ color: '#555', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ededed'}
              onMouseLeave={e => e.currentTarget.style.color = '#555'}>
              Syed Jarrar Haider Sherazi
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}