import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  handleAdd: () => {},
  handleAddFolder: () => {},
  deleteNote: () => {},
  
})

export default NoteContext