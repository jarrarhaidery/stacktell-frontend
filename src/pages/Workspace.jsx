import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Code2, MessageSquare, FileText, BookOpen, RotateCcw, Database, Layers, Globe } from 'lucide-react'
import RepoInput from '../components/RepoInput'
import FileTree from '../components/FileTree'
import ChatPanel from '../components/ChatPanel'
import DocViewer from '../components/DocViewer'
import OnboardingGuide from '../components/OnboardingGuide'
import { useRepoStore } from '../hooks/useRepo'
import { indexRepo } from '../api/client'

const TABS = [
  { id: 'chat',        label: 'Chat',       icon: MessageSquare },
  { id: 'docs',        label: 'Docs',       icon: FileText },
  { id: 'onboarding', label: 'Onboarding', icon: BookOpen },
]

export default function Workspace() {
  const navigate = useNavigate()
  const { repoId, repoName, fileTree, stats, activeTab, isIndexing, indexError,
          setRepo, setSelectedFile, selectedFile, setActiveTab, setIndexing, setIndexError, reset } = useRepoStore()

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
    <div className="h-screen flex flex-col bg-gray-950 text-gray-100">
      {/* Topbar */}
      <header className="border-b border-gray-800 px-4 py-3 flex items-center gap-4 flex-shrink-0">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Code2 size={18} className="text-indigo-400" />
          <span className="font-semibold text-sm">Stacktell <span className="text-indigo-400">AI</span></span>
        </button>
        <div className="flex-1 max-w-xl">
          <RepoInput onIndex={handleIndex} isIndexing={isIndexing} />
        </div>
        {repoId && (
          <button onClick={reset} className="text-gray-500 hover:text-gray-300 transition-colors p-1.5 rounded hover:bg-gray-800">
            <RotateCcw size={15} />
          </button>
        )}
      </header>

      {indexError && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm">{indexError}</div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 border-r border-gray-800 flex flex-col flex-shrink-0 overflow-hidden">
          {repoId ? (
            <>
              <div className="p-3 border-b border-gray-800">
                <p className="text-xs font-medium text-gray-200 truncate">{repoName}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Database size={10} /> {stats?.total_files} files
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Layers size={10} /> {stats?.total_chunks} chunks
                  </span>
                </div>
                {stats?.languages && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.entries(stats.languages).slice(0, 3).map(([lang, count]) => (
                      <span key={lang} className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">{lang}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1">Files</p>
                </div>
                <FileTree nodes={fileTree} onSelectFile={setSelectedFile} selectedFile={selectedFile} />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <Globe size={28} className="text-gray-700 mb-3" />
              <p className="text-xs text-gray-600 leading-relaxed">Paste a GitHub URL above and click Index Repo to get started</p>
            </div>
          )}
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-gray-800 flex">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === id ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat'        && <ChatPanel />}
            {activeTab === 'docs'        && <DocViewer />}
            {activeTab === 'onboarding' && <OnboardingGuide />}
          </div>
        </main>
      </div>
    </div>
  )
}
