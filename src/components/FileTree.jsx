import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react'

const EXT_COLORS = {
  '.py':   'text-blue-400',
  '.js':   'text-yellow-400',
  '.jsx':  'text-cyan-400',
  '.ts':   'text-blue-300',
  '.tsx':  'text-cyan-300',
  '.md':   'text-gray-400',
  '.yml':  'text-red-400',
  '.yaml': 'text-red-400',
  '.json': 'text-orange-400',
  '.go':   'text-teal-400',
  '.rs':   'text-orange-500',
}

function getExt(name) {
  const i = name.lastIndexOf('.')
  return i >= 0 ? name.slice(i) : ''
}

function TreeNode({ node, depth = 0, onSelectFile, selectedFile }) {
  const [open, setOpen] = useState(depth < 2)
  const isDir = node.type === 'dir'
  const ext = getExt(node.name)
  const fileColor = EXT_COLORS[ext] || 'text-gray-400'
  const isSelected = selectedFile === node.path

  if (isDir) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 w-full text-left py-0.5 px-2 rounded hover:bg-gray-800 transition-colors group"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {open ? <ChevronDown size={12} className="text-gray-500 flex-shrink-0" /> : <ChevronRight size={12} className="text-gray-500 flex-shrink-0" />}
          {open ? <FolderOpen size={13} className="text-indigo-400 flex-shrink-0" /> : <Folder size={13} className="text-indigo-400 flex-shrink-0" />}
          <span className="text-xs text-gray-300 truncate">{node.name}</span>
        </button>
        {open && node.children?.map(child => (
          <TreeNode key={child.path} node={child} depth={depth + 1} onSelectFile={onSelectFile} selectedFile={selectedFile} />
        ))}
      </div>
    )
  }

  return (
    <button
      onClick={() => onSelectFile(node.path)}
      className={`flex items-center gap-1.5 w-full text-left py-0.5 px-2 rounded transition-colors ${isSelected ? 'bg-indigo-600/20 border-l-2 border-indigo-500' : 'hover:bg-gray-800'}`}
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <File size={12} className={`flex-shrink-0 ${fileColor}`} />
      <span className={`text-xs truncate ${isSelected ? 'text-indigo-300' : 'text-gray-400'}`}>{node.name}</span>
    </button>
  )
}

export default function FileTree({ nodes, onSelectFile, selectedFile }) {
  if (!nodes?.length) return (
    <div className="p-4 text-xs text-gray-600 text-center">No files indexed yet</div>
  )
  return (
    <div className="py-1">
      {nodes.map(node => (
        <TreeNode key={node.path} node={node} onSelectFile={onSelectFile} selectedFile={selectedFile} />
      ))}
    </div>
  )
}
