import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Code2, User, FileCode } from 'lucide-react'
import { queryRepo } from '../api/client'
import { useRepoStore } from '../hooks/useRepo'

const SUGGESTIONS = [
  'How does this project work overall?',
  'What are the main API endpoints?',
  'How is authentication handled?',
  'Explain the folder structure',
  'What are the key dependencies?',
]

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium ${isUser ? 'bg-gray-700 text-gray-300' : 'bg-indigo-600/20 text-indigo-400'}`}>
        {isUser ? <User size={13} /> : <Code2 size={13} />}
      </div>
      <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-indigo-600/15 border border-indigo-500/20 text-gray-200 rounded-tr-none' : 'bg-gray-900 border border-gray-800 text-gray-300 rounded-tl-none'}`}>
        <p className="whitespace-pre-wrap">{msg.content}</p>
        {msg.sources?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700 flex flex-wrap gap-1.5">
            {msg.sources.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-800 text-indigo-400 px-2 py-0.5 rounded font-mono">
                <FileCode size={10} /> {s.file.split('/').pop()}
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
      const res = await queryRepo({
        repo_id: repoId,
        question: q,
        file_filter: selectedFile || undefined,
      })
      addMessage({ role: 'assistant', content: res.answer, sources: res.sources })
    } catch {
      addMessage({ role: 'assistant', content: 'Something went wrong. Make sure the backend is running.', sources: [] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {selectedFile && (
        <div className="px-4 py-2 bg-indigo-600/10 border-b border-indigo-500/20 text-xs text-indigo-400 flex items-center gap-1.5">
          <FileCode size={12} /> Scoped to: <span className="font-mono">{selectedFile}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
              <Code2 size={13} className="text-indigo-400" />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl rounded-tl-none px-4 py-3">
              <Loader2 size={14} className="animate-spin text-indigo-400" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => send(s)}
              className="text-xs bg-gray-900 border border-gray-700 hover:border-indigo-500 text-gray-400 hover:text-indigo-400 px-3 py-1.5 rounded-full transition-all">
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          placeholder={repoId ? 'Ask anything about this codebase...' : 'Index a repo first'}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          disabled={!repoId || loading}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-40"
        />
        <button onClick={() => send()} disabled={!input.trim() || loading || !repoId}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white p-2 rounded-lg transition-all">
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}
