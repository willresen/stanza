import React from 'react';

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    }
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleMouseHover(e) {
    this.setState({hovered: !this.state.hovered});
  }

  render() {
    const color = this.props.count > 1 ? 'red' : 'white';
    const bgColor = this.props.highlight ? 'green' : 'transparent';

    return (<span
      onClick={this.props.handleClick}
      style={{ backgroundColor: bgColor, color: color }}
      onMouseEnter={this.handleMouseHover}
      onMouseLeave={this.handleMouseHover}>{this.props.word}
    </span>)
  }
}

export default Word;