import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteContext from '../App/NoteContext';
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';
import NoteError from './NoteError';


export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = NoteContext;
  
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    modified: PropTypes.instanceOf(Date)
  }
  
  

  /*componentDidMount() {
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
  }*/

  handleClickDelete = e => {
    e.preventDefault()
    
    const noteId = this.props.id
    console.log(noteId)


       fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props

    console.log(id)
    
    return (
      <div className='Note'>
        <NoteError>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
          </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(modified, 'Do MMM YYYY')}
            </span>
          </div>
          <div>
          <Link to={`/edit/${id}`}>
           Edit note
          </Link>
          </div>
        </div>
        </NoteError>
      </div>
    )
  }

  
}


