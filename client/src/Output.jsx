import React from 'react';
import Word from './Word.jsx';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: []
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.text) !== JSON.stringify(this.props.text)) {
      this.setState({text: this.props.text.replace(/\n/ig, '<br>').split('<br>')});
    }
  };

  render() {
    let rhymes = this.props.rhymes[0] || [];
    return (<div id="output">{this.state.text.map(sentence => {
      return (<p>{sentence.split(' ').map(word => {
        return (<span><Word
          handleClick={this.props.handleClick}
          word={word}
          count={this.props.unique[word]}
          highlight={rhymes.includes(word) || this.props.selected === word}
          rhymes={rhymes}
        /><span> </span></span>)
      })}</p>);
    })}</div>);
  };

};

export default Output;