import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Novel } from '../../types/Novel';

function NovelCard(props: NovelCardProps) {
  return (
    <PlainStyleLink to={props.href}>
      <Thumbnail src={props.novel.novelImageUrl} alt="thumbnail" />
      <TitleRow>
        <h3>{props.novel.novelName}</h3>
        <Link to={`/publisher/${props.novel.authorId}`}>{props.novel.authorName}</Link>
      </TitleRow>
      <Description>{props.novel.novelIntroduce}</Description>
    </PlainStyleLink>
  );
}

interface NovelCardProps {
  novel: Novel;
  href: string;
}

const PlainStyleLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 125px;
  border-radius: 10px;
`;

const TitleRow = styled.div`
  margin: 5px 5px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  font-weight: bold;

  & > h3 {
    margin: 0;
    font-size: 18px;
  }
  & > p {
    margin: 0;
    font-size: 14px;
  }
`;

const Description = styled.p`
  margin: 5px 5px;
  font-size: 12px;
  color: #797979;
`;

export default NovelCard;
