import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaAward, FaHome, FaSignInAlt } from 'react-icons/fa';

function Navigation({ authUser, signOut }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">
            <FaHome />
            {' '}
            Home
          </Link>
        </li>
        <li>
          <Link to="/leaderboards">
            <FaAward />
            {' '}
            Leaderboards
          </Link>
        </li>
        <li>
          {authUser ? <button type="button" onClick={signOut}>Logout</button> : (
            <Link to="/login">
              <FaSignInAlt />
              {' '}
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  signOut: PropTypes.func.isRequired,
  authUser: PropTypes.shape(authUserShape),
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
