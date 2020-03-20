import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  deleteFolder: () => {},
})

export default NoteContext