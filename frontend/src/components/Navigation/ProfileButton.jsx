import { FaHouseChimneyUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="profile-button-container">
      <button onClick={goHome} className="menu-button" title="Home">
        <FaHouseChimneyUser />
      </button>
    </div>
  );
}

export default ProfileButton;
