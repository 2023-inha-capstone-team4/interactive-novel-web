/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { dateToString } from '../../utils/date';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Episode } from '../../types/Novel';
import NovelAPI from '../../api/NovelAPI';
import { AlertAPIContext } from '../../utils/alert';

export default function EpisodeList({ novelId }: EpisodeListProps) {
  const showAlert = useContext(AlertAPIContext);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const PAGE_SIZE = 15;

  // 다음 페이지 로드
  const loadMore = () => {
    setIsLoading(true);

    const start = episodes.length;
    const end = start + PAGE_SIZE - 1;

    NovelAPI.episodes(novelId, start, end)
      .then(({ data }) => {
        setEpisodes([...episodes, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => loadMore(), []);

  return (
    <ul css={episodeListStyle}>
      {episodes.map((episode) => (
        <EpisodeItem
          id={episode.id}
          title={episode.novelDetailName}
          thumbnail={episode.novelDetailImageUrl}
        />
      ))}
    </ul>
  );
}

interface EpisodeListProps {
  novelId: number;
}

const episodeListStyle = css``;

function EpisodeItem(props: EpisodeItemProps) {
  return (
    <li>
      <Link to={`/novel/viewer/${props.id}`}>
        <div css={episodeItemStyle}>
          <img src={props.thumbnail} alt="thumbnail" />
          <div className="episode-item-description">
            <h4>{props.title}</h4>
          </div>
        </div>
      </Link>
    </li>
  );
}

interface EpisodeItemProps {
  id: number;
  title: string;
  thumbnail: string;
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
