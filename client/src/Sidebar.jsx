import React from 'react';

const Sidebar = (props) => {
  return (
    <div id="sidebar">
      <div id="logo">stanza</div><br/>
      <div id="save_load">
        <form id="save" onSubmit={props.handleSave}>
          <input type="text"
            name="title"
            placeholder="Enter a Title"
            onChange={props.handleChange}
            required>
          </input>
          <input type="text"
            name="author"
            placeholder="Enter an Author"
            onChange={props.handleChange}
            required >
          </input>
          <button type="submit">Save</button><br/>
        </form>
        {props._id && <textarea id="save_id" value={props._id} readOnly></textarea>}
        <form id="load" onSubmit={props.handleLoad}>
          <input type="text"
            name="load_id"
            placeholder="Paste your Content ID here"
            onChange={props.handleChange}
            required>
          </input>
          <button type="submit">Load</button><br/>
        </form>
      </div>
      <div id="controls">
        <label><input type="checkbox"
          value="showRepetition"
          onChange={props.handleToggle}
          checked={props.showRepetition}>
        </input> Mark repeated words</label><br/>
        <label><input type="checkbox"
          value="highlightPerfectRhymes"
          onChange={props.handleToggle}
          checked={props.highlightPerfectRhymes}>
        </input>Highlight perfect rhymes</label><br/>
        <label><input type="checkbox"
          value="highlightSlantRhymes"
          onChange={props.handleToggle}
          checked={props.highlightSlantRhymes}>
        </input>Highlight slant rhymes</label><br/><br/><br/>
        <label><input type="checkbox"
          value="showCommonPhrases"
          onChange={props.handleToggle}
          checked={props.showCommonPhrases}>
        </input>Show common phrases</label><br/>
        <label><input type="checkbox"
          value="showSyllableCount"
          onChange={props.handleToggle}
          checked={props.showSyllableCount}>
        </input>Show syllable count</label><br/>
      </div>
    </div>
  );
};

export default Sidebar;