import React from 'react';

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  };

  handleMouseHover(e) {
    this.setState({hovered: !this.state.hovered});
  };

  render() {
    const color = this.props.count > 1 && this.props.showRepetition ? 'red' : 'white';
    const bgColor = this.props.highlight ? 'green' : 'transparent';
    const wordClass = this.props.highlight ? 'focused_word' : 'word';

    return (<span
      className={wordClass}
      onClick={this.props.handleClick}
      style={{ backgroundColor: bgColor, color: color }}
      onMouseEnter={this.handleMouseHover}
      onMouseLeave={this.handleMouseHover}>{this.props.word}
    </span>);
  };
};

export default Word;
