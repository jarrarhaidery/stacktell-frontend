import { useNavigate } from 'react-router-dom'
import { Code2, GitBranch, MessageSquare, FileText, Zap, ChevronRight, Star } from 'lucide-react'

const FEATURES = [
  { icon: MessageSquare, title: 'Chat with your code', desc: 'Ask anything about the repo. Get precise answers with exact file and function references.' },
  { icon: FileText,      title: 'Auto-generated docs', desc: 'Click any file and get full markdown documentation with function signatures instantly.' },
  { icon: GitBranch,     title: 'Onboarding guides',   desc: 'Generate a complete onboarding doc for new devs — structure, setup, core concepts, gotchas.' },
  { icon: Zap,           title: 'Blazing fast RAG',    desc: 'FAISS vector search + local embeddings means sub-second retrieval across thousands of chunks.' },
]

const STACK = ['LangChain', 'FAISS', 'Groq LLaMA3', 'FastAPI', 'React', 'Sentence Transformers']

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Code2 className="text-indigo-400" size={22} />
          <span className="font-semibold text-lg">Stacktell <span className="text-indigo-400">AI</span></span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/jarrarhaidery" target="_blank" rel="noreferrer"
            className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 px-3 py-1.5 rounded-lg transition-all text-sm flex items-center gap-1.5">
            <Star size={14} /> GitHub
          </a>
          <button onClick={() => navigate('/app')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-1.5">
            Launch App <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 rounded-full px-4 py-1.5 text-indigo-400 text-sm mb-8">
          <Zap size={13} /> RAG-powered · Free and Open Source
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Understand any codebase<br />
          <span className="text-indigo-400">in minutes, not days</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Paste a GitHub URL. Stacktell indexes the entire repo and becomes your personal expert —
          answer questions, generate docs, and onboard new devs instantly.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => navigate('/app')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
            Try it free <ChevronRight size={16} />
          </button>
          <a href="https://github.com/jarrarhaidery/codebase-explainer-backend"
            target="_blank" rel="noreferrer"
            className="text-gray-300 text-base px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all">
            View source
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-gray-500 text-sm font-mono">Stacktell.ai/app</span>
          </div>
          <div className="p-6 bg-gray-900/50 space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                <Code2 size={14} className="text-indigo-400" />
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl rounded-tl-none px-4 py-3 text-sm text-gray-300 max-w-lg">
                Repo <span className="text-indigo-400 font-mono">university-ai-assistant</span> indexed. 34 files, 812 chunks. Ask me anything.
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="bg-indigo-600/20 border border-indigo-500/20 rounded-xl rounded-tr-none px-4 py-3 text-sm text-gray-200 max-w-lg">
                How does the RAG pipeline work?
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0 text-xs font-medium">SJ</div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                <Code2 size={14} className="text-indigo-400" />
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl rounded-tl-none px-4 py-3 text-sm text-gray-300 max-w-lg">
                Starts in <code className="bg-gray-800 text-indigo-400 px-1.5 py-0.5 rounded text-xs">rag_pipeline.py</code> at <code className="bg-gray-800 text-indigo-400 px-1.5 py-0.5 rounded text-xs">ingest()</code>. Loads docs via LangChain, chunks with RecursiveCharacterTextSplitter, stores in FAISS. Queries route through <code className="bg-gray-800 text-indigo-400 px-1.5 py-0.5 rounded text-xs">main.py → /query</code>.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold text-center mb-12">Everything you need to understand code fast</h2>
        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
              <div className="w-9 h-9 bg-indigo-600/15 rounded-lg flex items-center justify-center mb-3">
                <Icon size={18} className="text-indigo-400" />
              </div>
              <h3 className="font-medium mb-1.5">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <p className="text-gray-500 text-sm mb-4">Built with</p>
        <div className="flex flex-wrap justify-center gap-2">
          {STACK.map(s => (
            <span key={s} className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{s}</span>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-600 text-sm">
        Built by <a href="https://linkedin.com/in/jarrarhaidery" className="text-gray-400 hover:text-gray-200 transition-colors">Syed Jarrar Haider Sherazi</a>
      </footer>
    </div>
  )
}
