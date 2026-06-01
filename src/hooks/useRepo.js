import { create } from 'zustand'

export const useRepoStore = create((set) => ({
  repoId: null, repoName: null, fileTree: [], stats: null, selectedFile: null,
  messages: [], activeTab: 'chat', isIndexing: false, indexError: null,

  setRepo: (data) => set({
    repoId: data.repo_id, repoName: data.repo_name, fileTree: data.file_tree,
    stats: { total_files: data.total_files, total_chunks: data.total_chunks, languages: data.languages },
    messages: [{
      role: 'assistant',
      content: `Repo **${data.repo_name}** indexed. ${data.total_files} files, ${data.total_chunks} chunks across ${Object.keys(data.languages).join(', ')}. Ask me anything.`,
      sources: [],
    }],
  }),

  addMessage:      (msg)  => set((s) => ({ messages: [...s.messages, msg] })),
  setSelectedFile: (path) => set({ selectedFile: path }),
  setActiveTab:    (tab)  => set({ activeTab: tab }),
  setIndexing:     (val)  => set({ isIndexing: val }),
  setIndexError:   (err)  => set({ indexError: err }),
  reset: () => set({
    repoId: null, repoName: null, fileTree: [], stats: null, selectedFile: null,
    messages: [], activeTab: 'chat', isIndexing: false, indexError: null,
  }),
}))
