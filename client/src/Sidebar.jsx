import React from 'react';

const Sidebar = (props) => {
  return (
    <div id="sidebar">
      <div id="logo">stanza</div><br/>
      <div id="save_load">
        <form id="save" onSubmit={props.handleSave}>
          <input type="text"
            name="title"
            placeholder="Title"
            onChange={props.handleChange}
            required>
          </input>
          <input type="text"
            name="author"
            placeholder="Author"
            onChange={props.handleChange}
            required >
          </input>
          <button type="submit">Save</button><br/>
        </form>
        <textarea id="save_id" value={props._id} readOnly></textarea>
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
        <input type="checkbox"
          value="showRepetition"
          onChange={props.handleToggle}
          checked={props.showRepetition}>
        </input>
        <span>Mark repeated words</span><br/>
        <input type="checkbox"
          value="highlightPerfectRhymes"
          onChange={props.handleToggle}
          checked={props.highlightPerfectRhymes}>
        </input>
        <span>Highlight perfect rhymes</span><br/>
        <input type="checkbox"
          value="highlightSlantRhymes"
          onChange={props.handleToggle}
          checked={props.highlightSlantRhymes}>
        </input>
        <span>Highlight slant rhymes</span><br/><br/><br/>
        <input type="checkbox"
          value="showCommonPhrases"
          onChange={props.handleToggle}
          checked={props.showCommonPhrases}>
        </input>
        <span>Show common phrases</span><br/>
        <input type="checkbox"
          value="showSyllableCount"
          onChange={props.handleToggle}
          checked={props.showSyllableCount}>
        </input>
        <span>Show syllable count</span><br/>
      </div>
    </div>
  );
};

export default Sidebar;