import React from 'react';
import {Link} from 'react-router-dom';
import CircleButton from '../CircleButton/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Add.css';




class AddFolder extends React.Component {
    
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
            </div>
  
        )
  }
}

export default AddFolder;
