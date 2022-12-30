import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({ threads, onVote }) {
  return (
    <div className="threads-list">
      {
        threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} vote={onVote} />
        ))
      }
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onVote: PropTypes.func.isRequired,
};

export default ThreadsList;
