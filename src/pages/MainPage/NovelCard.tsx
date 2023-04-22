import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Novel } from '../../types/Novel';

function NovelCard(props: NovelCardProps) {
  return (
    <PlainStyleLink to={props.href}>
      <Thumbnail src="http://www.sbs.com.au/theboat/images/fb-image.jpg" alt="thumbnail" />
      <TitleRow>
        <h3>{props.novel.name}</h3>
        <Link to={`/publisher/${props.novel.publisher.id}`}>{props.novel.publisher.name}</Link>
      </TitleRow>
      <Description>Based on the story by Nam Le, Adaptation by Matt Huynh</Description>
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
