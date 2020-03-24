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
    console.log(noteContext)

        
    const folderList = noteContext &&
    noteContext.folders && noteContext.folders.map((item) =>(
             item.name))

    const folderIds = noteContext &&
    noteContext.folders && noteContext.folders.map((item) =>(
    item.id))
   
    console.log(folderIds[0])

    const changeSelection = (value) =>{
   
    
      var folderId;
      if (value == "Important") {
        folderId = folderIds[0]
      } else if (value == "Super") {
        folderId = folderIds[1]
      } else {
        folderId = folderIds[2]
      }
      

      //let DateGenerator = require('random-date-generator');
      //let modified = DateGenerator.getRandomDate();
      
      this.setState({ 
        
        folderSelection: value,
        folderId: folderId
        /*modified: modified,*/
      
      });
    }
        
    const options = folderList.map(item => {return item})

    const onSubmitForm = (e) => {
      e.preventDefault()

      /*fetch(`${config.API_ENDPOINT}/notes/`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
          return res.json()
        })
        .then(() => {*/
          this.context.handleAdd(e.target.itemToAdd.value, e.target.contentToAdd.value, /*this.state.folderSelection, */this.state.folderId)
         this.props.onAddNote()
    
        this.props.history.push('/')

        /*})
        .catch(error => {
          console.error({ error })
        })*/

        
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
           />
           </li>

           <li className = "inputItems">
           <label>Content</label>
           <input
            name = 'contentToAdd'
            type='text'
            aria-label='content'
          />
            </li>


          <li className = "inputItems">   
          <label>Folder</label>
            <select 
            id="folder" 
            //name="folderToGo"
            onChange={e => changeSelection(e.target.value)}
            >
            <option>...</option>
            <option value = "Important"> {options[0]}</option>
            <option value = "Super"> {options[1]}</option>
            <option value = "Spangley"> {options[2]}</option>
          </select>
          </li>
            
          <li className = "inputItems"> 
            <button className= "addNoteFormButton"
            //onClick={() => props.onClickAdd(props.id)}
            type= "submit"        
          >
            Add note
          </button>
          </li>
          
          </ul>

          </form>
        )
  }
}

export default withRouter (AddNoteForm);