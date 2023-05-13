import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { findAccessToken } from '../../services/auth-service';

export default function MyAccountButton() {
  const navigate = useNavigate();

  const accessToken = findAccessToken();

  const handleAccountButtonClick = () => {
    if (!accessToken) {
      navigate('/sign/in');
      return;
    }

    navigate('/my');
  };

  return (
    <IconButton onClick={handleAccountButtonClick}>
      {accessToken ? <PersonIcon /> : <LoginIcon />}
    </IconButton>
  );
}
