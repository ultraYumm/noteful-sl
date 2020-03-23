import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from './AddNoteForm';
import './Add.css';




class AdNote extends React.Component {

  renderAddForm() {
    return (
    <Route 
      path='/add-note'
      render = { () =>
            
        <AddNoteForm
        />}/>)
  }

    
  render() {

        return (
          <div > 
            <button className ='AddNoteButton'
            type= "submit"
             >
            <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </CircleButton>
            </button>
            <div><AddNoteForm
        /></div>        
            </div>
  
        )
  }
}

export default AdNote;

            /*<Route
            path ='/add-note'
            render = { () =>
            
            <AddNoteForm
            />}/>*/