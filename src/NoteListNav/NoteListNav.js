import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import AddFolder from '../AddNotes&Folders/AddFolder'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import NoteContext from '../App/NoteContext';

class NoteListNav extends Component {
  static contextType = NoteContext;
  
  render () {
    const noteContext = this.context
    console.log(noteContext)
    
  

  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {noteContext.folders.map(folder =>
          <li key={folder.id}>
            <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(noteContext.notes, folder.id)}
              </span>
              {folder.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <AddFolder/>
       </div>
    </div>
  )
}


}


export default NoteListNav;
