import React from 'react';

const Word = ({ word, count, highlight, handleClick }) => {
  const color = count > 1 ? 'red' : 'black';
  const bgColor = highlight ? 'green' : 'transparent';

  return <span onClick={handleClick} style={{backgroundColor: bgColor, color: color}}>{word}</span>
}

export default Word;