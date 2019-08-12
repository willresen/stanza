import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div id="sidebar">
        <div id="save_load">
          <div id="save">
            <input type="text" placeholder="Title"></input>
            <input type="text" placeholder="Author"></input><br/>
            <button>Save</button>
          </div>
          <div id="load">
            <input type="text" placeholder="Content ID"></input><br />
            <button>Load</button>
          </div>
        </div>
        <div id="controls">
          <input type="checkbox"
            value="showRepetition"
            onChange={this.props.handleToggle}
            checked={this.props.showRepetition}>
          </input>
          <span>Mark repeated words</span><br />
          <input type="checkbox"
            value="highlightPerfectRhymes"
            onChange={this.props.handleToggle}
            checked={this.props.highlightPerfectRhymes}>
          </input>
          <span>Highlight perfect rhymes</span><br />
          <input type="checkbox"
            value="highlightSlantRhymes"
            onChange={this.props.handleToggle}
            checked={this.props.highlightSlantRhymes}>
          </input>
          <span>Highlight slant rhymes</span><br /><br /> <br />
          <input type="checkbox"
            value="showCommonPhrases"
            onChange={this.props.handleToggle}
            checked={this.props.showCommonPhrases}>
          </input>
          <span>Show common phrases</span><br />
          <input type="checkbox"
            value="showSyllableCount"
            onChange={this.props.handleToggle}
            checked={this.props.showSyllableCount}>
          </input>
          <span>Show syllable count</span><br />
        </div>
      </div>
    );
  };
}

export default Sidebar;