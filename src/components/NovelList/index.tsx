import styled from '@emotion/styled';
import { Novel } from '../../types/Novel';
import FullWidthNovelCard from './FullWidthNovelCard';

function NovelList(props: NovelListProps) {
  return (
    <StyledList>
      {props.novels.map((novel: Novel) => (
        <li>
          <FullWidthNovelCard novel={novel} href={`/novel/${novel.id}`} />
        </li>
      ))}
    </StyledList>
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
