import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import '/src/index.css';
import './Navigation.css';

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
        <NavLink to="/login">Log In</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <ul className="nav-list">
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;




// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);
//   const dispatch = useDispatch();

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const sessionLinks = sessionUser ? (
//     <>
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//       <li>
//         <button onClick={logout}>Log Out</button>
//       </li>
//     </>
//   ) : (
//     <>
//       <li>
//         <NavLink to="/login">Log In</NavLink>
//       </li>
//       <li>
//         <NavLink to="/signup">Sign Up</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;

