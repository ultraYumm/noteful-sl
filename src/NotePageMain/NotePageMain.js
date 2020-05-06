
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
  

  componentDidMount() {
    const noteId = this.props.match.params.noteId
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'GET'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
      .then(responseData => {
        this.setState({
          note:  responseData
        })
      })
      .catch(error => this.setState({ error }))
  
  }
  )}

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

 
  render() {
    
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }
    

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