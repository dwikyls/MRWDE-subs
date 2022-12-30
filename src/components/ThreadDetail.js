import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import parse from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadDetail({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  vote,
}) {
  const isThreadLiked = upVotesBy.includes(authUser) ? null : true;
  const isThreadDisliked = downVotesBy.includes(authUser) ? null : false;

  const onToggleVote = (event, isUp) => {
    event.stopPropagation();
    vote(id, isUp);
  };

  return (
    <section className="thread-comment">
      <div className="thread-comment__user-avatar">
        <img src={owner.avatar} alt={owner.name} />
      </div>
      <article>
        <div className="thread-comment__user-info">
          <p className="thread-comment__user-name">{owner.name}</p>
          <p className="thread-comment__created-at">{postedAt(createdAt)}</p>
        </div>
        <p className="thread-comment__text">{parse(content)}</p>
        <div className="thread-comment__like">
          <p>
            <button
              type="button"
              aria-label="like"
              onClick={(event) => {
                onToggleVote(event, isThreadLiked);
              }}
            >
              <FaThumbsUp style={{ color: isThreadLiked == null ? 'red' : 'grey' }} />
              {' '}
              {upVotesBy.length}
            </button>
            &nbsp;
            &nbsp;
            <button
              type="button"
              aria-label="like"
              onClick={(event) => {
                onToggleVote(event, isThreadDisliked);
              }}
            >
              <FaThumbsDown style={{ color: isThreadDisliked == null ? 'red' : 'grey' }} />
              {' '}
              {downVotesBy.length}
            </button>
          </p>
        </div>
      </article>
    </section>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  authUser: PropTypes.string,
};

ThreadDetail.propTypes = {
  ...commentShape,
  vote: PropTypes.func,
};

ThreadDetail.defaultProps = {
  vote: null,
};

export default ThreadDetail;
