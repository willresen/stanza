import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit() {
    console.log(new Set(this.state.text.replace(/\n/ig, ' ').split(' ')));
  }

  render() {
    return (
      <div id="workspace">
        <div id="tools">
          <button onClick={this.handleSubmit}>Analyze</button>
        </div>
        <div id="editor">
          <textarea className="text" value={this.state.text} onChange={this.handleChange}></textarea>
        </div>
      </div>
    );
  };
}

export default Editor;
