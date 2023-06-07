import styled from '@emotion/styled';
import { Novel } from '../../types/Novel';
import FullWidthNovelCard from './FullWidthNovelCard';
import { Box } from '@mui/material';

function NovelList(props: NovelListProps) {
  return (
    <>
      {props.novels.length > 0 ? (
        <StyledList>
          {props.novels.map((novel: Novel) => (
            <li key={novel.id}>
              <FullWidthNovelCard novel={novel} href={`/novel/${novel.id}`} />
            </li>
          ))}
        </StyledList>
      ) : (
        <Box textAlign="center" padding={5}>
          <small>항목이 존재하지 않습니다.</small>
        </Box>
      )}
    </>
  );
}

interface NovelListProps {
  novels: Novel[];
}

const StyledList = styled.ul`
  padding-left: 0;
  list-style: none;

  & > * {
    margin: 15px 15px;
  }
`;

export default NovelList;
