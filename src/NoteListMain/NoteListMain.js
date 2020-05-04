import React from 'react'
import Note from '../Note/Note'
import AddNote from '../AddNotes&Folders/AddNote'
import NoteContext from '../App/NoteContext';
import { getNotesForFolder } from '../notes-helpers'
import './NoteListMain.css'
import PropTypes from 'prop-types';

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NoteContext

  static propTypes = {
    folderid: PropTypes.string,
    note: PropTypes.array
  }

  render() {
    const { folderid } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderid)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
        <AddNote>
        </AddNote>
        </div>
      </section>
    )
  }
}