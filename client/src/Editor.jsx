import React from 'react';

const Editor = (props) => {
  return (
    <div id="workspace">
      <div id="tools">
        <button id="analyze" onClick={() => props.handleSubmit(props.editorText)}>Analyze</button>
      </div>
      <div id="editor">
        <textarea className="text"
          name="editorText"
          value={props.editorText}
          onChange={props.handleChange}
          spellCheck="false">
        </textarea>
      </div>
    </div>
  );
};

export default Editor;
