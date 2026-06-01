import { useState } from 'react'
import { BookOpen, Loader2, Download } from 'lucide-react'
import { generateOnboarding } from '../api/client'
import { useRepoStore } from '../hooks/useRepo'

export default function OnboardingGuide() {
  const { repoId, repoName } = useRepoStore()
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async () => {
    if (!repoId) return
    setLoading(true)
    setError(null)
    try {
      const res = await generateOnboarding({ repo_id: repoId })
      setGuide(res.guide)
    } catch {
      setError('Failed to generate onboarding guide.')
    } finally {
      setLoading(false)
    }
  }

  const download = () => {
    const blob = new Blob([guide], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${repoName}-onboarding.md`
    a.click()
  }

  if (!repoId) return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <BookOpen size={32} className="text-gray-700 mb-3" />
      <p className="text-gray-500 text-sm">Index a repo first to generate an onboarding guide</p>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Onboarding guide for</p>
          <code className="text-indigo-400 text-sm font-mono">{repoName}</code>
        </div>
        <div className="flex items-center gap-2">
          {guide && (
            <button onClick={download}
              className="text-gray-400 hover:text-gray-200 border border-gray-700 hover:bg-gray-800 text-sm px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all">
              <Download size={13} /> .md
            </button>
          )}
          <button onClick={generate} disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            {loading ? <><Loader2 size={13} className="animate-spin" /> Generating...</> : <><BookOpen size={13} /> Generate Guide</>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</p>}
        {guide && (
          <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">{guide}</pre>
        )}
        {!guide && !error && !loading && (
          <p className="text-gray-600 text-sm text-center mt-8">Click Generate Guide to create a full onboarding doc for new developers</p>
        )}
      </div>
    </div>
  )
}
