import React from 'react';
import Sidebar from './Sidebar.jsx';
import Editor from './Editor.jsx';
import Output from './Output.jsx';
import OtherWords from './OtherWords.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: '',
      text: [],
      rhymes: [],
      related: [],
      unique: {},
      selected: '',
      title: '',
      author: '',
      _id: '',
      load_id: '',
      showRepetition: true,
      showCommonPhrases: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.count = this.count.bind(this);
  };

  handleSave(e) {
    e.preventDefault();
    fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: this.state.author, title: this.state.title, text: this.state.text })
    })
      .then(result => result.json())
      .then(result => this.setState(result))
  };

  handleLoad(e) {
    e.preventDefault();
    fetch(`/api/songs/?id=${this.state.load_id}`)
      .then(result => result.json())
      .then(result => this.setState(result[0]))
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(text) {
    let words = text.replace(/\n/ig, ' ').replace(/[^a-zA-Z ]/g, '').split(' ');
    let uniqueWords = this.count(words);
    this.setState({text: text, unique: uniqueWords});
  };

  handleToggle(event) {
    const toToggle = event.target.value;
    this.setState({[toToggle]: !this.state[toToggle]})
  };

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
        rhymes.push(pefectRhymes
          .map(rhyme => ({ word: rhyme.word, frequency: -1 }))
          .concat(slantRhymes.reduce((acc, next) => {
            let frequency = parseFloat(next.tags[0].split(':')[1])
            if (frequency >= 0.4) acc.push({ word: next.word, frequency: frequency });
            return acc;
          }, [])));
        related = relatedWords;
      })
    this.setState({ rhymes: rhymes, related: related, selected: word });
  };

  count(words) {
    let unique = {};
    for(let word of words) {
      unique[word] && (unique[word] += 1);
      !unique[word] && (unique[word] = 1);
    }
    return unique;
  };

  render() {
    return (
      <div id="main">
        <Sidebar
          author={this.state.author}
          title={this.state.title}
          handleChange={this.handleChange}
          handleToggle={this.handleToggle}
          handleSave={this.handleSave}
          handleLoad={this.handleLoad}
          showRepetition={this.state.showRepetition}
          showCommonPhrases={this.state.showCommonPhrases}
          _id={this.state._id}
          />
        <Editor
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          editorText={this.state.editorText}/>
        <Output
          handleClick={this.handleClick}
          text={this.state.text}
          rhymes={this.state.rhymes}
          unique={this.state.unique}
          selected={this.state.selected}
          showRepetition={this.state.showRepetition} />
        <OtherWords rhymes={this.state.rhymes} related={this.state.related} />
      </div>
    );
  };
};

export default App;