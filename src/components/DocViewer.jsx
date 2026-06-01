import { useState } from 'react'
import { FileText, Loader2, ChevronDown, ChevronRight } from 'lucide-react'
import { generateDocs } from '../api/client'
import { useRepoStore } from '../hooks/useRepo'

function FunctionCard({ fn }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors">
        <div className="flex items-center gap-2">
          {open ? <ChevronDown size={13} className="text-gray-500" /> : <ChevronRight size={13} className="text-gray-500" />}
          <code className="text-indigo-400 text-xs font-mono">{fn.name}()</code>
        </div>
      </button>
      {open && (
        <div className="px-3 py-2 bg-gray-950 border-t border-gray-800">
          <code className="text-xs text-gray-500 font-mono block mb-1">{fn.signature}</code>
          <p className="text-xs text-gray-400">{fn.docstring}</p>
        </div>
      )}
    </div>
  )
}

export default function DocViewer() {
  const { repoId, selectedFile } = useRepoStore()
  const [docs, setDocs] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generate = async () => {
    if (!repoId || !selectedFile) return
    setLoading(true)
    setError(null)
    try {
      const res = await generateDocs({ repo_id: repoId, file_path: selectedFile })
      setDocs(res)
    } catch {
      setError('Failed to generate docs. Select a file from the tree first.')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedFile) return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <FileText size={32} className="text-gray-700 mb-3" />
      <p className="text-gray-500 text-sm">Select a file from the tree to generate documentation</p>
    </div>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Generating docs for</p>
          <code className="text-indigo-400 text-sm font-mono">{selectedFile.split('/').pop()}</code>
        </div>
        <button onClick={generate} disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          {loading ? <><Loader2 size={13} className="animate-spin" /> Generating...</> : <><FileText size={13} /> Generate Docs</>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</p>}
        {docs && (
          <div className="space-y-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-sans">{docs.documentation}</pre>
            </div>
            {docs.functions?.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Functions</h3>
                <div className="space-y-1.5">
                  {docs.functions.map((fn, i) => <FunctionCard key={i} fn={fn} />)}
                </div>
              </div>
            )}
          </div>
        )}
        {!docs && !error && !loading && (
          <p className="text-gray-600 text-sm text-center mt-8">Click Generate Docs to analyse this file</p>
        )}
      </div>
    </div>
  )
}
