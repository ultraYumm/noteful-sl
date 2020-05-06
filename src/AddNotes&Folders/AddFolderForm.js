import React from "react";
import './Add.css'
import NoteContext from '../App/NoteContext';
import { withRouter } from 'react-router-dom';
import config from '../config'




class AddFolderForm extends React.Component {
  
  
  static defaultProps ={
    onAddFolder: () => {},

  }
 
  static contextType = NoteContext;
  
     
  render() {

    const noteContext = this.context
    console.log(noteContext)
 
    //const newRandomfolderid =  Math.random().toString(36).substring(10, 2)

     const onSubmitForm = (e) => {
        e.preventDefault()

        let folderToAdd =  e.target.folderToAdd.value
        console.log(folderToAdd)

      const inputValues = {
      name: folderToAdd
    }

        fetch(`${config.API_ENDPOINT}/folders/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(inputValues),
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
          .then(() => {


          this.context.handleAddFolder(folderToAdd)
        
      })
      this.props.history.push('/')
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
                  placeholder='Great'
                  required
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

export default withRouter (AddFolderForm);