import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageSquare, FileText, BookOpen, RotateCcw, Layers, ArrowRight, Github } from 'lucide-react'
import RepoInput from '../components/RepoInput'
import FileTree from '../components/FileTree'
import ChatPanel from '../components/ChatPanel'
import DocViewer from '../components/DocViewer'
import OnboardingGuide from '../components/OnboardingGuide'
import { useRepoStore } from '../hooks/useRepo'
import { indexRepo } from '../api/client'

const TABS = [
  { id: 'chat',       label: 'Chat',       icon: MessageSquare },
  { id: 'docs',       label: 'Docs',       icon: FileText },
  { id: 'onboarding', label: 'Onboarding', icon: BookOpen },
]

const S = {
  shell: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#080808',
    color: '#ededed',
    fontFamily: "'Geist', system-ui, sans-serif",
    overflow: 'hidden',
  },
  topbar: {
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    padding: '0 16px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
    background: '#0a0a0a',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    textDecoration: 'none',
    flexShrink: 0,
    cursor: 'pointer',
  },
  logoMark: {
    width: '20px',
    height: '20px',
    background: '#fff',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  sidebar: {
    width: '220px',
    borderRight: '0.5px solid rgba(255,255,255,0.07)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    overflow: 'hidden',
    background: '#0a0a0a',
  },
  sidebarHead: {
    padding: '12px',
    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
    flexShrink: 0,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabbar: {
    borderBottom: '0.5px solid rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 2px',
    flexShrink: 0,
    background: '#0a0a0a',
  },
}

export default function Workspace() {
  const navigate = useNavigate()
  const {
    repoId, repoName, fileTree, stats, activeTab, isIndexing, indexError,
    setRepo, setSelectedFile, selectedFile, setActiveTab,
    setIndexing, setIndexError, reset,
  } = useRepoStore()

  const handleIndex = async (payload) => {
    setIndexing(true)
    setIndexError(null)
    try {
      const data = await indexRepo(payload)
      setRepo(data)
    } catch (e) {
      setIndexError(e?.response?.data?.detail || 'Indexing failed. Check the URL and try again.')
    } finally {
      setIndexing(false)
    }
  }

  return (
    <div style={S.shell}>
      {/* Topbar */}
      <header style={S.topbar}>
        <div onClick={() => navigate('/')} style={S.logo}>
          <div style={S.logoMark}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 2h3v3H2zM7 2h3v3H7zM2 7h3v3H7zM7 7h3v3H7z" fill="#080808" />
            </svg>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '-0.02em', color: '#ededed' }}>Stacktell</span>
        </div>

        <div style={{ width: '0.5px', height: '16px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

        <div style={{ flex: 1, maxWidth: '520px' }}>
          <RepoInput onIndex={handleIndex} isIndexing={isIndexing} />
        </div>

        {repoId && (
          <button onClick={reset}
            style={{ marginLeft: 'auto', padding: '5px', borderRadius: '6px', background: 'transparent', border: '0.5px solid rgba(255,255,255,0.08)', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
            title="Reset"
            onMouseEnter={e => { e.currentTarget.style.color = '#ededed'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}>
            <RotateCcw size={13} />
          </button>
        )}
      </header>

      {indexError && (
        <div style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.08)', borderBottom: '0.5px solid rgba(239,68,68,0.15)', fontSize: '12px', color: '#f87171', flexShrink: 0 }}>
          {indexError}
        </div>
      )}

      <div style={S.body}>
        {/* Sidebar */}
        <aside style={S.sidebar}>
          {repoId ? (
            <>
              <div style={S.sidebarHead}>
                <div style={{ fontSize: '12px', fontWeight: 500, color: '#ededed', letterSpacing: '-0.02em', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {repoName}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[['files', stats?.total_files], ['chunks', stats?.total_chunks]].map(([l, v]) => (
                    <div key={l} style={{ fontSize: '11px', color: '#444', fontFamily: "'Geist Mono', monospace" }}>
                      <span style={{ color: '#888' }}>{v}</span> {l}
                    </div>
                  ))}
                </div>
                {stats?.languages && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                    {Object.keys(stats.languages).slice(0, 4).map(lang => (
                      <span key={lang} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)', color: '#555', fontFamily: "'Geist Mono', monospace" }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
                <div style={{ padding: '8px 12px 4px', fontSize: '10px', fontFamily: "'Geist Mono', monospace", color: '#333', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Explorer
                </div>
                <FileTree nodes={fileTree} onSelectFile={setSelectedFile} selectedFile={selectedFile} />
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center', gap: '10px' }}>
              <Github size={22} color="#222" />
              <p style={{ fontSize: '12px', color: '#333', lineHeight: 1.6 }}>Paste a GitHub URL above to index a repo</p>
            </div>
          )}
        </aside>

        {/* Main panel */}
        <main style={S.main}>
          <div style={S.tabbar}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '0 14px', height: '40px',
                  fontSize: '12px', fontWeight: activeTab === id ? 500 : 400,
                  color: activeTab === id ? '#ededed' : '#444',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  borderBottom: `1px solid ${activeTab === id ? '#6366f1' : 'transparent'}`,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (activeTab !== id) e.currentTarget.style.color = '#888' }}
                onMouseLeave={e => { if (activeTab !== id) e.currentTarget.style.color = '#444' }}>
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflow: 'hidden' }}>
            {activeTab === 'chat'        && <ChatPanel />}
            {activeTab === 'docs'        && <DocViewer />}
            {activeTab === 'onboarding' && <OnboardingGuide />}
          </div>
        </main>
      </div>
    </div>
  )
}