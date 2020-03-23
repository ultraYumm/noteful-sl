import React from "react";
import './Add.css'
import NoteContext from '../App/NoteContext';




class AddFolderForm extends React.Component {
  
  
  static defaultProps ={
    onAddFolder: () => {},

  }
  static contextType = NoteContext;
  
     
  render() {

    const noteContext = this.context
    console.log(noteContext)

     const onSubmitForm = (e) => {
        e.preventDefault()
          this.context.handleAddFolder(e.target.folderToAdd.value)
          this.props.onAddFolder()
      }


    return (
          

          <form className = "noteList" onSubmit={onSubmitForm}>
            <h2>Create a folder</h2>
          <ul className = "inputBox">

          <li className = "inputItems">
          <label>Name</label>
        
          <input
            name='folderToAdd'
            type='text'
            aria-label='name'
           />
           </li>

             <li className = "inputItems"> 
            <button className= "addNoteFormButton"
           
            type= "submit"        
          >
            Add folder
          </button>
          </li>
          
          </ul>

          </form>
        )
  }
}

export default AddFolderForm;