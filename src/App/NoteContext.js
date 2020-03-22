import React from 'react'

const NoteContext = React.createContext({
  folders: [],
  notes: [],
  handleAddNote: () => {},
  deleteNote: () => {}
  
})

export default NoteContext