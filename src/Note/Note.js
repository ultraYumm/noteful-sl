import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import config from '../config';
import NoteContext from '../App/NoteContext';



function deleteNoteRequest(id, callback) {
  fetch(config.API_ENDPOINT + `/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log(deleteNoteRequest())

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
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
      callback(id)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function Note(props) {
  return (
    <NoteContext.Consumer>
      {(context)=> (

    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      
      <button className='Note__delete' type='button'
      onClick={() => {
        deleteNoteRequest(
        props.id,
        context.deleteNote,
        )
        }}
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
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )}
   </NoteContext.Consumer>
  )
}