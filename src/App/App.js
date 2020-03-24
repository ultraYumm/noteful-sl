import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NoteContext from './NoteContext';
import AddNoteForm from '../AddNotes&Folders/AddNoteForm';
import AddFolderForm from '../AddNotes&Folders/AddFolderForm';
import config from '../config';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
    };

   

            deleteNote = noteId => {
        const newNotes = this.state.notes.filter(nt =>
             nt.id !== noteId
            )
            this.setState({
              notes: newNotes
            })
          }
      
          handleAdd = (noteName, noteContent, folderId) => {
            console.log(noteName, noteContent, folderId)
        
            const newNotesArray = [
              ...this.state.notes,
              {name: noteName, 
              content: noteContent,
              folderId: folderId}
              //modified: 
              ]
        
                  
            this.setState({
             
              notes: newNotesArray
                    })
          };
      
          handleAddFolder = (folderName) => {
            console.log(folderName)
        
             const newFolderArray = [
              ...this.state.folders,
              {name: folderName}
            ]
      
            this.setState({
              folders: newFolderArray,
             })
          };
      


          componentDidMount() {
            Promise.all([
                fetch(`${config.API_ENDPOINT}/notes`),
                fetch(`${config.API_ENDPOINT}/folders`)
            ])
                .then(([notesRes, foldersRes]) => {
                    if (!notesRes.ok)
                        return notesRes.json().then(e => Promise.reject(e));
                    if (!foldersRes.ok)
                        return foldersRes.json().then(e => Promise.reject(e));
    
                    return Promise.all([notesRes.json(), foldersRes.json()]);
                })
                .then(([notes, folders]) => {
                    this.setState({notes, folders});
                })
                .catch(error => {
                    console.error({error});
                });
        }

        renderNavRoutes() {
            return (
                <>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListNav}
                        />
                    ))}
                    <Route path="/note/:noteId" component={NotePageNav} />
                    <Route path="/add-folder" 
                    render={({ history }) => {
                    console.log(history)
                    return <AddFolderForm
                    onAddFolder={this.AddFolderForm}
                    onSubmit= {() => history.push('/')}
                                 />
                       }}
                    
                    
                    component={AddFolderForm} />
                    
                    
                    <Route path="/add-note" component={AddNoteForm} />
                </>
            );
        }

        renderMainRoutes() {
            return (
                <>
                    {['/', '/folder/:folderId'].map(path => (
                        <Route
                            exact
                            key={path}
                            path={path}
                            component={NoteListMain}
                        />
                    ))}
                    <Route path="/note/:noteId" component={NotePageMain} />
                </>
            );
        }


    render() {

            const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            handleAdd: this.handleAdd,
            handleAddFolder: this.handleAddFolder,
            deleteNote: this.deleteNote,
           
            }
           
        return (
            <div className="App">
                  <NoteContext.Provider value={contextValue}>
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>            
                </NoteContext.Provider>
            </div>
        );
    }
}

export default App;
