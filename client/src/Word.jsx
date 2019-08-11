import React from 'react';

const Word = ({ word, count, pool }) => {
  return count > 1 ? <span style={{color: 'red'}}>{word} </span> : <span>{word} </span>;
}

export default Word;