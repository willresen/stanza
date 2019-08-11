import React from 'react';
import Word from './Word.jsx';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: []
    }
    this.analyze = this.analyze.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.text) !== JSON.stringify(this.props.text)) {
    this.setState({text: this.props.text.replace(/\n/ig, '<br>').split('<br>')});
    }
  }

  analyze(sentence) {
    let rhymes = this.props.rhymes[0] ? this.props.rhymes[0] : [];
    let highlight = false;

    return (
      <p>{
        sentence.split(' ').map(word => {

          if(rhymes.includes(word) || this.props.selected === word) {
            highlight = true;
          } else {
            highlight = false;
          }

          return (<span><Word
            handleClick={this.props.handleClick}
            word={word}
            count={this.props.unique[word]}
            highlight={highlight}
          /><span> </span></span>)
        })
      }</p>
    )
  }

  render() {
    console.log('RENDERING')
    return (
      <div id="output">
        {this.state.text.map(line => this.analyze(line))}
      </div>
    );
  };
}

export default Output;