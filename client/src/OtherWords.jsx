import React from 'react';

class OtherWords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    }
  };

  componentDidUpdate(prev) {
    if (this.props.rhymes.length !== prev.rhymes.length) {
      this.setState({display: true});
    }
  };

  render() {
    return this.state.display && (
      <div id="other_words">
        <div id="rhymes">
          <ul>{this.props.rhymes[0] && this.props.rhymes[0].sort().map(rhyme => <li>{rhyme}</li>)}</ul>
        </div>
        <div id="related">
          <ul>{this.props.related && this.props.related.map(word => <li>{word.word}</li>)}</ul>
        </div>
      </div>
    );
  };

};

export default OtherWords;