import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link } from 'react-router-dom';

function PlayButton(props: PlayButtonProps) {
  return (
    <Link to={`/novel/viewer/${props.novelId}`}>
      <Box position="relative">
        <Thumbnail src={props.thumbnail} alt="thumbnail" />
        <PlayIcon />
      </Box>
    </Link>
  );
}

interface PlayButtonProps {
  novelId: number;
  thumbnail: string;
}

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 550px;
  object-fit: cover;
  filter: brightness(50%);
`;

function PlayIcon() {
  return (
    <PlayIconContainer>
      <PlayCircleIcon sx={{ width: 100, height: 100, color: '#ffffff' }} />
    </PlayIconContainer>
  );
}

const PlayIconContainer = styled.div`
  width: 100%;
  height: 550px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default PlayButton;
