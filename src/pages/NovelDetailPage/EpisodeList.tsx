/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { dateToString } from '../../utils/date';
import { Link } from 'react-router-dom';

export default function EpisodeList() {
  return (
    <ul css={episodeListStyle}>
      <EpisodeItem
        title="Episode 4"
        thumbnail="http://www.sbs.com.au/theboat/images/fb-image.jpg"
        created={new Date()}
      />
      <EpisodeItem
        title="Episode 3"
        thumbnail="http://www.sbs.com.au/theboat/images/fb-image.jpg"
        created={new Date()}
      />
      <EpisodeItem
        title="Episode 2"
        thumbnail="http://www.sbs.com.au/theboat/images/fb-image.jpg"
        created={new Date()}
      />
      <EpisodeItem
        title="Episode 1"
        thumbnail="http://www.sbs.com.au/theboat/images/fb-image.jpg"
        created={new Date()}
      />
    </ul>
  );
}

const episodeListStyle = css``;

function EpisodeItem(props: EpisodeItemProps) {
  return (
    <li>
      <Link to="/novel/viewer/1">
        <div css={episodeItemStyle}>
          <img src={props.thumbnail} alt="thumbnail" />
          <div className="episode-item-description">
            <h4>{props.title}</h4>
            <p>{dateToString(props.created)}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

interface EpisodeItemProps {
  title: string;
  thumbnail: string;
  created: Date;
}

const episodeItemStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  padding: 10px 0;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }

  .episode-item-description {
    margin: 3px 15px;
  }

  h4 {
    margin: 0;
    margin-bottom: 5px;
  }

  p {
    margin: 0;
    font-size: 12px;
  }
`;
