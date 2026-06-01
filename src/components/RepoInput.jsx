import { useState } from 'react'
import { Github, Loader2, Lock } from 'lucide-react'

export default function RepoInput({ onIndex, isIndexing }) {
  const [url, setUrl] = useState('')
  const [branch, setBranch] = useState('main')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = () => {
    if (!url.trim()) return
    onIndex({ repo_url: url.trim(), branch })
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="https://github.com/user/repo"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isIndexing || !url.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-4 py-2.5 rounded-lg transition-all text-sm flex items-center gap-2 whitespace-nowrap"
        >
          {isIndexing ? <><Loader2 size={14} className="animate-spin" /> Indexing...</> : 'Index Repo'}
        </button>
      </div>

      <button onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
        {showAdvanced ? 'Hide' : 'Show'} advanced options
      </button>

      {showAdvanced && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 whitespace-nowrap">Branch:</label>
          <input
            type="text"
            value={branch}
            onChange={e => setBranch(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs text-gray-300 focus:outline-none focus:border-indigo-500 w-32"
          />
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Lock size={10} /> Public repos only
          </div>
        </div>
      )}
    </div>
  )
}
