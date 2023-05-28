import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Novel } from '../../types/Novel';
import { dateToString } from '../../utils/date';

function FullWidthNovelCard(props: FullWidthNovelCardProps) {
  return (
    <StyledCard to={props.href}>
      <Thumbnail src={props.novel.novelImageUrl} alt="thumbnail" />
      <div>
        <Title>{props.novel.novelName}</Title>
        <PublisherRow>
          <Link to={`/publisher/${props.novel.authorId}`} className="publisher">
            {props.novel.authorName}
          </Link>
        </PublisherRow>
        <Description>{props.novel.novelIntroduce}</Description>
      </div>
    </StyledCard>
  );
}

interface FullWidthNovelCardProps {
  novel: Novel;
  href: string;
}

const StyledCard = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;

  text-decoration: none;
  color: #000000;
`;

const Thumbnail = styled.img`
  width: 130px;
  height: 130px;
  margin-right: 15px;
  border-radius: 10px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const PublisherRow = styled.div`
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  .publisher {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }
  .date {
    margin: 0 8px;
    font-size: 12px;
  }
`;

const Description = styled.p`
  margin: 5px 0px;
  font-size: 12px;
  color: #797979;
`;

export default FullWidthNovelCard;
