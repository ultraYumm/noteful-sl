import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddNoteForm from './AddNoteForm';
import './Add.css';




class AdNote extends React.Component {

    
  render() {

        return (
          <div>
            <button className ='Note'
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

          <AddNoteForm/>
           
            

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