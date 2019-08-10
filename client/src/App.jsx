import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: null,
      currentDocument: null,
      saved: false,
    }
    this.fetchDocuments = this.fetchDocuments.bind(this);
  };

  fetchDocuments() {

  };

  render() {
    return (
      <div>

      </div>
    );
  };

}

export default App;