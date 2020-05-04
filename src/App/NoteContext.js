import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  handleAdd: () => {},
  handleAddFolder: () => {},
  deleteNote: () => {},
  updateNote: () => {},
  
})

export default NoteContext