import React from 'react';
import Sidebar from './Sidebar.jsx';
import Editor from './Editor.jsx';
import Output from './Output.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      rhymes: [],
      related: [],
      unique: {},
      selected: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.count = this.count.bind(this);
  };

  handleSubmit(text) {
    let words = text.replace(/\n/ig, ' ').split(' ');
    let uniqueWords = this.count(words);
    this.setState({text: text, unique: uniqueWords});
  }

  async handleClick(e) {
    let word = e.target.innerText;
    let rhymes = [];
    let related;

    await Promise.all([
      fetch(`https://api.datamuse.com/words?rel_rhy=${word}&max=1000`).then(result => result && result.json()),
      fetch(`https://api.datamuse.com/words?rel_nry=${word}&max=1000`).then(result => result && result.json()),
      fetch(`https://api.datamuse.com/words?rel_syn=${word}&max=1000`).then(result => result && result.json())
    ])
      .then(([pureRhymes, slantRhymes, relatedWords]) => {
        rhymes.push(pureRhymes.map(rhyme => rhyme.word).concat(slantRhymes.map(rhyme => rhyme.word)));
        related = relatedWords;
      })
    this.setState({ rhymes: rhymes, related: related, selected: word});
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
        <Editor handleSubmit={this.handleSubmit} />
        <Output
          handleClick={this.handleClick}
          text={this.state.text}
          rhymes={this.state.rhymes}
          related={this.state.related}
          unique={this.state.unique}
          selected={this.state.selected}
        />
      </div>
    );
  };
}

export default App;