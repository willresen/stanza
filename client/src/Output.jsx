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
    console.log(sentence);
    return (
    <p>{
      sentence.split(' ')
        .map(word => <Word word={word} count={this.props.unique[word]} pool={this.props.pool} />)
    }</p>
    )
  }

  render() {
    return (
      <div id="output">
        {this.state.text.map(line => this.analyze(line))}
      </div>
    );
  };
}

export default Output;