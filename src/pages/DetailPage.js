import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import ThreadItem from '../components/ThreadItem';
import ThreadReplyInput from '../components/ThreadReplyInput';
import { asyncReceiveThreadDetail, asyncToogleLikeThreadDetail } from '../states/threadDetail/action';
import { asyncAddComment, asyncToogleLikeComment } from '../states/comments/action';

function DetailPage() {
  const { id } = useParams();
  const {
    authUser,
    threadDetail = null,
    comments = [],
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  const toggleLikeThread = (threadId, isUp) => {
    dispatch(asyncToogleLikeThreadDetail(isUp));
  };

  const toggleLikeComment = (commentId, isUp) => {
    dispatch(asyncToogleLikeComment({ threadId: id, commentId, isUp }));
  };

  const onComment = (content) => {
    dispatch(asyncAddComment({ content, threadId: id }));
  };

  const detailThread = {
    ...threadDetail,
    authUser: authUser?.id,
    totalComments: comments.length,
  };

  const commentList = comments.map((comment) => ({
    ...comment,
    authUser: authUser?.id,
  }));

  return (
    <section className="detail-page">
      <div className="detail-page__parent">
        <ThreadItem {...detailThread} vote={toggleLikeThread} />
      </div>
      {
        authUser
          ? (
            <ThreadReplyInput replyThread={onComment} />
          ) : (
            <div className="login-warning">
              <Link to="/login">Login</Link>
              {' '}
              untuk melanjutkan
            </div>
          )
      }
      {
        commentList
          .map(
            (comment) => (
              <ThreadDetail
                key={comment.id}
                {...comment}
                vote={toggleLikeComment}
              />
            ),
          )
      }
    </section>
  );
}

export default DetailPage;
