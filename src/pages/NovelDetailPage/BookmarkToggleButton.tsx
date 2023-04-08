import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function BookmarkToggleButton(props: BookmarkToggleButtonProps) {
  return (
    <Button
      variant={props.value ? 'contained' : 'outlined'}
      startIcon={<StarIcon />}
      onClick={props.onClick}
    >
      {props.value ? '북마크 해제' : '북마크'}
    </Button>
  );
}

interface BookmarkToggleButtonProps {
  value: boolean;
  onClick?: () => void;
}

export default BookmarkToggleButton;
