import React from 'react';
import Sidebar from './Sidebar.jsx';
import Editor from './Editor.jsx';
import Output from './Output.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      pool: [],
      unique: {}
    }
    this.fetchDocuments = this.fetchDocuments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.count = this.count.bind(this);
  };

  async handleSubmit(text) {
    let words = text.replace(/\n/ig, ' ').split(' ');
    let uniqueWords = this.count(words);

    for (let word in uniqueWords) {
      Promise.all([
        fetch(`https://api.datamuse.com/words?rel_nry=${word}`).then(result => result.json()),
        fetch(`https://api.datamuse.com/words?rel_rhy=${word}`).then(result => result.json()),
        fetch(`https://api.datamuse.com/words?rel_syn=${word}`).then(result => result.json())
      ])
        .then(([pureRhymes, slantRhymes, relatedWords]) => {
          this.setState({ pool: { pureRhymes, slantRhymes, relatedWords }, text: text, unique: uniqueWords });
        })
    }

  }

  count(words) {
    let unique = {};
    for(let word of words) {
      unique[word] && (unique[word] += 1);
      !unique[word] && (unique[word] = 1);
    }
    return unique;
  }

  render() {
    return (
      <div id="main">
        <Sidebar />
        <Editor handleSubmit={this.handleSubmit}/>
        <Output text={this.state.text} pool={this.state.pool} unique={this.state.unique}/>
      </div>
    );
  };
}

export default App;