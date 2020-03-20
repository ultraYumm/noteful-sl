import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import NoteContext from './NoteContext';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

   /* addBookmark = bookmark => {
        this.setState({
          bookmarks: [ ...this.state.bookmarks, bookmark ],
        })
      }

    addBookmark = bookmark => {
        this.setState({
          bookmarks: [ ...this.state.bookmarks, bookmark ],
        })
      }*/

      deleteNote = id => {
        const newNotes = this.state.notes.filter(nt =>
             nt.id !== id
            )
            this.setState({
              notes: newNotes
            })
          }
      
      

    componentDidMount() {
        // fake date loading from API call
        // test
        setTimeout(() => this.setState(), 600);
        fetch('http://localhost:9090/folders')
        .then(res => {
         if (!res.ok) {
           throw new Error(res.status)
         }
         return res.json()
       })
       .then(folders => {
         console.log(folders)
         this.setState({folders: folders})
       })

       fetch('http://localhost:9090/notes')
        .then(res => {
         if (!res.ok) {
           throw new Error(res.status)
         }
         return res.json()
       })
       .then(notes => {
         console.log(notes)
         this.setState({notes: notes})
       })


    } 

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component= {NoteListNav}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }


     //NoteContext should be before render?
    render() {

            const contextValue = {
            folders: this.state.folders,
            notes: this.state.notes,
            //addNote: this.addNote,
            deleteNote: this.deleteNote,
            deleteFolder: this.deleteFolder
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


/*renderMainRoutes() {
    const {notes, folders} = this.state;
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    render={routeProps => {
                        const {folderId} = routeProps.match.params;
                        const notesForFolder = getNotesForFolder(
                            notes,
                            folderId
                        );
                        return (
                            <NoteListMain
                                {...routeProps}
                                notes={notesForFolder}
                            />
                        );
                    }}
                />
            ))}
            <Route
                path="/note/:noteId"
                render={routeProps => {
                    const {noteId} = routeProps.match.params;
                    const note = findNote(notes, noteId);
                    return <NotePageMain {...routeProps} note={note} />;
                }}
            />
        </>
    );
}

 //NoteContext should be before render?
render() {

        const contextValue = {
        folders: this.state.folders,
        notes: this.state.notes,
        //addNote: this.addNote,
        deleteNote: this.deleteNote,
        deleteFolder: this.deleteFolder
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
*/