import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'; 
import './ProfileButton.css';

function ProfileButton() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="profile-button-container">
      <button onClick={goHome} className="menu-button" title="Home">
        <img src={logo} alt="Home Logo" className="profile-logo" />
      </button>
    </div>
  );
}

export default ProfileButton;
