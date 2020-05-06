
export const findFolder = (folders=[], folderid) =>
  folders.find(folder => folder.id === folderid)

  export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id.toString() === noteId.toString())

export const getNotesForFolder = (notes=[], folderid) => (
  (!folderid)
    ? notes
    : notes.filter(note => note.folderid.toString() === folderid.toString())
)

export const countNotesForFolder = (notes=[], folderid) =>
  notes.filter(note => note.folderid === folderid).length
