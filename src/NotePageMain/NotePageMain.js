
import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import { findNote } from '../notes-helpers'
import NoteContext from '../App/NoteContext';
import PropTypes from 'prop-types';
import config from '../config'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NoteContext


  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    modified: PropTypes.instanceOf(Date)
  }
  
  
    

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

 

  render() {


    
    const { notes } = this.context
    const { noteId } = this.props.match.params
    console.log(noteId)
    const note = findNote(notes, noteId) || { content: '' }
    console.log(noteId)
    console.log(notes)
    console.log(notes[0])

    const noteTest = notes.find((note => note.id === noteId)
    )

    console.log(noteTest)
  

    
    

    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}