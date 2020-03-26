import React from 'react';

class AppError extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }

      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
    
  

    render() {
        if (this.state.hasError) {      
          return (
            <h2>Could not display Noteful content</h2>
          );
        }
        return this.props.children;
      }
      
    }

    export default AppError;