import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  render() {
    return (
      <div id="workspace">
        <div id="tools">
          <button id="analyze" onClick={() => this.props.handleSubmit(this.state.text)}>Analyze</button>
        </div>
        <div id="editor">
          <textarea className="text" value={this.state.text} onChange={this.handleChange} spellCheck="false"></textarea>
        </div>
      </div>
    );
  };
}

export default Editor;
