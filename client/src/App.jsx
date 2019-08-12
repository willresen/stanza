import React from 'react';
import Sidebar from './Sidebar.jsx';
import Editor from './Editor.jsx';
import Output from './Output.jsx';
import OtherWords from './OtherWords.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      rhymes: [],
      related: [],
      unique: {},
      selected: '',
      showRepetition: true,
      showCommonPhrases: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.count = this.count.bind(this);
  };

  handleSubmit(text) {
    let words = text.replace(/\n/ig, ' ').replace(/[^a-zA-Z ]/g, '').split(' ');
    let uniqueWords = this.count(words);
    this.setState({text: text, unique: uniqueWords});
  }

  handleToggle(event) {
    const toToggle = event.target.value;
    this.setState({[toToggle]: !this.state[toToggle]})
  }

  async handleClick(e) {
    let word = e.target.innerText.replace(/[^a-zA-Z ]/g, '');
    let rhymes = [];
    let related;

    await Promise.all([
      fetch(`https://api.datamuse.com/words?rel_rhy=${word}&max=1000`).then(result => result && result.json()),
      fetch(`https://api.datamuse.com/words?arhy=1&max=5000&qe=sl&md=f&sl=${word}`).then(result => result && result.json()),
      fetch(`https://api.datamuse.com/words?rel_syn=${word}&max=1000`).then(result => result && result.json())
    ])
      .then(([pefectRhymes, slantRhymes, relatedWords]) => {
        rhymes.push(pefectRhymes.map(rhyme => rhyme.word).concat(slantRhymes.reduce((acc, next) => {
          if (parseFloat(next.tags[0].split(':')[1]) >= 0.4) {
            acc.push(next.word);
          }
          return acc;
        }, [])));
        related = relatedWords;
      })
    this.setState({ rhymes: rhymes, related: related, selected: word });
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
        <Sidebar handleToggle={this.handleToggle}
          showRepetition={this.state.showRepetition}
          showCommonPhrases={this.state.showCommonPhrases} />
        <Editor handleSubmit={this.handleSubmit} />
        <Output
          handleClick={this.handleClick}
          text={this.state.text}
          rhymes={this.state.rhymes}
          unique={this.state.unique}
          selected={this.state.selected}
          showRepetition={this.state.showRepetition}
        />
        <OtherWords rhymes={this.state.rhymes} related={this.state.related} />
      </div>
    );
  };
}

export default App;