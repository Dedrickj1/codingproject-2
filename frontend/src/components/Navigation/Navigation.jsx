import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import '/src/index.css';
import './Navigation.css';
import logo from '../../images/logo.png'; 

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const sessionLinks = sessionUser ? (
    <>
      <li className="nav-greeting">Hello, {sessionUser.firstName}</li>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
      <li>
        <div className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            Menu ▼
          </button>
          {showDropdown && (
            <ul className="dropdown-menu">
              <li>
                <NavLink to="/spots/current" className="dropdown-button">
                  Manage Spots
                </NavLink>
              </li>
              <li>
                <NavLink to="/reviews/current" className="dropdown-button">
                  Manage Reviews
                </NavLink>
              </li>
              <li>
                <button onClick={logout} className="dropdown-button">
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </div>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/login" className="nav-auth-button">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup" className="nav-auth-button">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <div className="nav-container">
      <ul className="nav-list">
        {isLoaded && sessionLinks}
      </ul>
      <img src={logo} alt="Dedrick's Logo" className="nav-logo" />
    </div>
  );
}

export default Navigation;
