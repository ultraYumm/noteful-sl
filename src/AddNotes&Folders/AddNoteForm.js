import React from "react";
import './Add.css'
import NoteContext from '../App/NoteContext';
import { withRouter } from 'react-router-dom';
import config from '../config'

class AddNoteForm extends React.Component {
  
    static defaultProps ={
    onAddNote: () => {},

  }
  static contextType = NoteContext;
  
     
  render() {

    const noteContext = this.context
       
    const folderList = noteContext &&
    noteContext.folders && noteContext.folders.map((item) =>(<option>
             {item.name}</option>))

    
    const changeSelection = (value) =>{

      const folderArr = noteContext.folders.filter(num=>num.name === value)
      var folderId = folderArr[0].id  
      this.setState({ 
   
       folderId: folderId,
      
      });
    }  
        
    const onSubmitForm = (e) => {
      e.preventDefault()
     
    
    let modified = new Date();
    let note = {
        name: e.target.itemToAdd.value,
        content: e.target.contentToAdd.value,
        folderId: this.state.folderId,
        modified: modified,
      }

      fetch(`${config.API_ENDPOINT}/notes/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(note),
      })

      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })

        .then((note) => {
          this.context.handleAdd(note)
        })

        .catch(error => {
          console.error({ error })
        })
            

        this.props.onAddNote()
        this.props.history.push('/')
    }

    return (
        <form className = "noteList" onSubmit={onSubmitForm}>
         <h2>Create a note</h2>
          <ul className = "inputBox">

            <li className = "inputItems">
            <label>Name</label>
          
              <input
                name='itemToAdd'
                type='text'
                aria-label='name'
                placeholder='Panda'
              required
              />
            </li>

           <li className = "inputItems">
              <label>Content</label>
              <input
                name = 'contentToAdd'
                type='text'
                aria-label='content'
                placeholder='Black and white animal....'
              />
           </li>
  
          <li className = "inputItems">   
            <label>Folder</label>
              <select 
              id="folder"        
              onChange={e => changeSelection(e.target.value)}
              >
              <option>...</option>
              {folderList}
            </select>
         </li>
            
         <li className = "inputItems"> 
          <button 
            className= "addNoteFormButton"
            type = "submit">
            Add note
          </button>
         </li>
          
        </ul>

      </form>
        )
  }
}

export default withRouter (AddNoteForm);