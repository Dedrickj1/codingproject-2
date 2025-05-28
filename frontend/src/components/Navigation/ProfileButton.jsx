// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaHouseChimneyUser } from "react-icons/fa6";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';
import '/src/index.css';
import './ProfileButton.css';
import { useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
    setShowMenu(false);
  };

  const handleManageSpots = () => {
    navigate("/spots/current");
    setShowMenu(false);
  };

  return (
    <div className="profile-button-container">
      <button onClick={toggleMenu} className="menu-button">
        <FaHouseChimneyUser />
      </button>
      {showMenu && (
        <ul className="profile-dropdown" ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.firstName}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={handleManageSpots} className="manage-link-button prof-butt">
                  Manage Spots
                </button>
              </li>
              <li>
                <button onClick={logout} className="prof-butt">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
