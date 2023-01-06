import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './styled/Button';
import Textarea from './styled/Textarea';

function ThreadReplyInput({ replyThread }) {
  const [content, setContent] = useState('');

  const replyThreadHandler = () => {
    if (content.trim()) {
      replyThread(content);
      setContent('');
    }
  };

  const handleContentChange = ({ target }) => {
    if (target.value.length <= 320) {
      setContent(target.value);
    }
  };

  return (
    <div className="thread-reply-input">
      <Textarea type="text" placeholder="Komentar..." value={content} onChange={handleContentChange} />
      <p className="thread-reply-input__char-left">
        <strong>{content.length}</strong>
        /320
      </p>
      <Button type="submit" onClick={replyThreadHandler}>Balas</Button>
    </div>
  );
}

ThreadReplyInput.propTypes = {
  replyThread: PropTypes.func.isRequired,
};

export default ThreadReplyInput;
