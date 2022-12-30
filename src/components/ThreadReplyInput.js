import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadReplyInput({ replyThread }) {
  const [content, setContent] = useState('');

  function replyThreadHandler() {
    if (content.trim()) {
      replyThread(content);
      setContent('');
    }
  }

  function handleContentChange({ target }) {
    if (target.value.length <= 320) {
      setContent(target.value);
    }
  }

  return (
    <div className="thread-reply-input">
      <textarea type="text" placeholder="Komentar..." value={content} onChange={handleContentChange} />
      <p className="thread-reply-input__char-left">
        <strong>{content.length}</strong>
        /320
      </p>
      <button type="submit" onClick={replyThreadHandler}>Balas</button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
