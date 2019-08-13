import React from 'react';
import Word from './Word.jsx';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      text: []
    };
  };

  componentDidUpdate(prev) {
    if (JSON.stringify(prev.text) !== JSON.stringify(this.props.text)) {
      this.setState({text: this.props.text.replace(/\n/ig, '<br>').split('<br>'), display: true});
    }
  };

  render() {
    let rhymes = (this.props.rhymes[0] && this.props.rhymes[0].map(rhyme => rhyme.word)) || [];
    return this.state.display && (<div id="output">{this.state.text.map(sentence => {
      return (<p>{sentence.split(' ').map(word => {
        return (<span><Word
          handleClick={this.props.handleClick}
          word={word}
          count={this.props.unique[word.replace(/[^a-zA-Z ]/g, '')]}
          highlight={rhymes.includes(word.replace(/[^a-zA-Z ]/g, '')) ||
            this.props.selected === word.replace(/[^a-zA-Z ]/g, '')}
          showRepetition={this.props.showRepetition}
        /><span> </span></span>)
      })}</p>);
    })}</div>);
  };

};

export default Output;