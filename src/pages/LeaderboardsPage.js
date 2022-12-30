import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  return (
    <section className="leaderboards-page">
      <h3>Leaderboards</h3>
      <table>
        <thead>
          <tr>
            <th>Pengguna</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          {
            leaderboards.map((leaderboard) => (
              <tr key={leaderboard.user.email}>
                <td className="leaderboard-user__detail">
                  <img src={leaderboard.user.avatar} alt={leaderboard.user.avatar} />
                  {' '}
                  &nbsp;
                  <div className="leaderboard-user__name">{leaderboard.user.name}</div>
                </td>
                <td>{leaderboard.score}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default LeaderboardsPage;
