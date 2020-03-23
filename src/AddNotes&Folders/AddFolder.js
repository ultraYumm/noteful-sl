import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddFolderForm from './AddFolderForm';
import './Add.css';




class AddFolder extends React.Component {

  renderAddForm() {
    return (
    <Route 
      path='/add-folder'
      component={AddFolderForm}/>)
  }

    
  render() {

        return (
          <div>
            <button className ='AddFolderButton'
            type= "submit"
             >
           <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
            </button>
            <div><AddFolderForm
        /></div>   
            </div>
  
        )
  }
}

export default AddFolder;
