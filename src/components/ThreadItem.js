import React from 'react';
import PropTypes from 'prop-types';
import {
  FaThumbsUp, FaThumbsDown, FaComment,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  vote,
  authUser,
}) {
  const navigate = useNavigate();
  const isThreadLiked = upVotesBy.includes(authUser) ? null : true;
  const isThreadDisliked = downVotesBy.includes(authUser) ? null : false;

  const onToggleVote = (event, isUp) => {
    event.stopPropagation();
    vote(id, isUp);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <div role="button" tabIndex={0} className="thread-item" data-category={category} onClick={onThreadClick} onKeyDown={() => { }}>
      <div className="thread-item__user-header">
        <div className="thread-item__user-photo">
          <img src={owner.avatar} alt="user_image" />
        </div>
        <div className="thread-item__user-detail">
          <p className="thread-item__user-name">{owner.name}</p>
          <p className="thread-item__created-at">
            {postedAt(createdAt)}
          </p>
        </div>
      </div>
      <div className="thread-item__detail">
        <div className="thread-item__title">{title}</div>
        <article>
          <div className="thread-item__body">{parse(body)}</div>
        </article>
        <div className="thread-item__category">
          #
          {category}
        </div>
        <div className="thread-item__likes">
          <div>
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
            &nbsp;
            &nbsp;
            <button type="button" aria-label="like">
              <FaComment />
              {' '}
              {totalComments}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  vote: PropTypes.func,
};

ThreadItem.defaultProps = {
  vote: null,
};

export { threadItemShape };

export default ThreadItem;
