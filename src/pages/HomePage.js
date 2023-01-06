import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadInput from '../components/ThreadInput';
import ThreadsList from '../components/ThreadsList';
import CategoryList from '../components/CategoryList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncAddThread, asyncToogleLikeThread, filterThreadActionCreator } from '../states/threads/action';

function HomePage() {
  const {
    authUser,
    threads = [],
    localThreads = [],
    users = [],
    categories = [],
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onVote = (id, isUp) => {
    dispatch(asyncToogleLikeThread(id, isUp));
  };

  const onCategoryChange = (category) => {
    dispatch(filterThreadActionCreator(category, localThreads));
  };

  return (
    <section className="home-page">
      <div className="category-tab">
        <h4>Tag</h4>
        <CategoryList categories={categories} onCategoryChange={onCategoryChange} />
      </div>
      <div className="main-tab">
        {
          authUser && <ThreadInput addThread={onAddThread} type="light" />
        }

        <ThreadsList threads={threadList} onVote={onVote} />
      </div>
      <div className="utils-tab" />
    </section>
  );
}

export default HomePage;
