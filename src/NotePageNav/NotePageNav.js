import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../App/NoteContext';
import { findNote, findFolder } from '../notes-helpers'
import './NotePageNav.css'
import NotePageNavError from './NotePageNavError';
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = NoteContext;

  static propTypes = {
    noteId: PropTypes.string,
  }

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderid)
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folder && (
          <NotePageNavError>
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
          </NotePageNavError> 
          )}
      </div>
    )
  }
}