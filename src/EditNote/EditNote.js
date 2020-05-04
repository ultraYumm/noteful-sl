import React, { Component } from  'react';
//import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import config from '../config'
import NoteContext from '../App/NoteContext';
import './EditNote.css';

const Required = () => (
  <span className='EditNote__required'>*</span>
)

class EditNote extends Component {

  
  static contextType = NoteContext;

  state = {
    note: null,
    error: null,
  };

  
componentDidMount() {
    const noteId = this.props.id
    fetch(config.API_ENDPOINT + `/notes` + `/${noteId}`, {
      method: 'GET'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
      .then(responseData => {
        this.setState({
          note:  responseData
        })
      })
      .catch(error => this.setState({ error }))
  
  }
  )
  }

 /* handleChangename = e => {
    this.setState({ name: e.target.value })
  };*/


handleSubmit = e => {
    e.preventDefault()
      // validation not shown
     
      const { name,  content} = e.target
      const inputValues = {
      name: name.value,
      content: content.value,
      folderid: this.state.folderid,
    }
    console.log(inputValues)

    this.setState({ error: null })

      fetch(`http://localhost:8000/api/Notes/${this.props.match.params.noteId}`, {
        method: 'PATCH',
        body: JSON.stringify(inputValues),
        headers: {
          'content-type': 'application/json',
        },
      
      })
      .then(res => {
        if (!res.ok) {
          console.log(res)
           return res.json().then(error => Promise.reject(error))
          }
           })
      .then(() => {
        this.resetFields(inputValues)
        this.context.updateNote(inputValues)
        window.location.href='/'
       // this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  resetFields = (newFields) => {
    this.setState({
      name: newFields.name || '',
      content: newFields.content || '',
      folderid: newFields.folderid || '',
    })
  }
  
  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {

    const noteContext = this.context
    const folderList = noteContext &&
    noteContext.folders && noteContext.folders.map((item) =>(<option>
             {item.name}</option>))

    const { error } = this.state
    const { name, content} = this.state.note || {}

    const changeSelection = (value) =>{

        const folderArr = noteContext.folders.filter(num=>num.name === value)
        var folderid = folderArr[0].id  
        this.setState({ 
     
         folderid: folderid,
        
        });
      }  

    return (
      <section className='EditNote'>
        <h2>Edit note</h2>
        <form
          className='EditNote__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='name'>
              Name
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder={name}
              required
              //value={name}
              //onChange={this.handleChangename}
            />
          </div>
          <div>
            <label htmlFor='content'>
            Content
            </label>
            <textarea
              name='content'
              id='content'
              placeholder={content}
              //value={content}
            />
          </div>
          <div>
          <label>Folder</label>
              <select 
              id="folder"        
              onChange={e => changeSelection(e.target.value)}
              >
              <option>...</option>
              {folderList}
            </select>
          </div>
          <Required />
          <div className='EditNote__buttons'>
          <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(EditNote);

