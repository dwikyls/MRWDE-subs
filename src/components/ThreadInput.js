import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange, setTitle] = useInput('');
  const [body, , setBody] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');

  function onAddThread() {
    if (body.trim()) {
      addThread(title, body, category);
      setTitle('');
      setBody('');
      setCategory('');
    }
  }

  function onBodyChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }

  return (
    <div className="thread-input">
      <input type="text" placeholder="Judul" value={title} onChange={onTitleChange} />
      <textarea type="text" placeholder="Konten" value={body} onChange={onBodyChange} />
      <p className="thread-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <input type="text" placeholder="#Kategori" value={category} onChange={onCategoryChange} />
      <button type="submit" onClick={onAddThread}>Kirim</button>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
