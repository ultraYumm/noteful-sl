import React from "react";
import "./App.css";


class AddFolder extends React.Component {

    
  render() {

        return (
            <button className= "NavCircleButton"
            //onClick={() => props.onClickAdd(props.id)}
            type='button'

          >
            + Folder
          </button>
        )
  }
}

export default AddFolder;