import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

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
            <input type="text" placeholder="Content ID"></input><br/>
            <button>Load</button>
          </div>
        </div>
        <div id="controls">
          <input name="control" type="checkbox" value="mark_repetition" checked></input><span>Mark repeated words</span><br/>
          <input name="control" type="checkbox" value="common_phrases" checked></input><span>Show common phrases</span>
        </div>
      </div>
    );
  };
}

export default Sidebar;