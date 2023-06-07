/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewerTool, ViewerToolBox } from './ViewerToolBox';
import { useContext, useEffect, useState } from 'react';
import { CircularProgress, SwipeableDrawer } from '@mui/material';
import Reviews from './Reviews';
import styled from '@emotion/styled';
import ClientScenesViewer from '../../libs/renderer/component/ClientScenesViewer';
import { Scene } from '../../libs/renderer/lib/Scene';
import NovelAPI from '../../api/NovelAPI';
import { JsonParser } from '../../libs/renderer/lib/dataParser/JsonParser';
import { AlertAPIContext } from '../../utils/alert';

function NovelViewerPage() {
  const { episodeId: idParam } = useParams();
  const episodeId = parseInt(idParam);

  const navigate = useNavigate();
  const showAlert = useContext(AlertAPIContext);

  const [scenes, setScenes] = useState(null);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);

  const openReviewDrawer = () => setReviewDrawerOpen(true);
  const closeReviewDrawer = () => setReviewDrawerOpen(false);

  const loadScenes = () => {
    NovelAPI.episode(episodeId)
      .then((resp) => {
        const jsonData = resp.data.novelData;
        const parsedData = JsonParser.jsonToSceneList(jsonData);
        setScenes(parsedData);
      })
      .catch((e) => showAlert(e.response.data.errorMessage));
  };

  useEffect(() => {
    loadScenes();
  }, []);

  // 로딩 뷰
  if (scenes === null) {
    return (
      <LoadingScreen>
        <CircularProgress />
        <p>작품을 불러오고 있어요</p>
      </LoadingScreen>
    );
  }

  return (
    <div css={style}>
      <div className="canvas-container">
        <ClientScenesViewer scenes={scenes} />
      </div>
      <SwipeableDrawer
        anchor="bottom"
        open={reviewDrawerOpen}
        onOpen={openReviewDrawer}
        onClose={closeReviewDrawer}
      >
        <Reviews episodeId={episodeId} />
      </SwipeableDrawer>
      <div className="viewtoolbox-container">
        <ViewerToolBox>
          {/* <ViewerTool>좋아요</ViewerTool> */}
          <ViewerTool onClick={openReviewDrawer}>댓글</ViewerTool>
          <ViewerTool>맨 위로</ViewerTool>
          <ViewerTool onClick={() => navigate(-1)}>그만 볼래요</ViewerTool>
        </ViewerToolBox>
      </div>
    </div>
  );
}

const style = css`
  width: 100vw;
  height: 100vh;
  background-color: #0f0f0f;

  .canvas-container {
    width: 100%;
    height: 100%;
    max-width: 700px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & canvas {
      width: 100%;
    }
  }

  .reviewmodal-container {
    position: fixed;
    top: 0;
    left: 0;
  }

  .viewtoolbox-container {
    position: fixed;
    top: 15px;
    right: 10px;
  }
`;

const LoadingScreen = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #0f0f0f;
  color: #fff;

  & > p {
    margin: 20px 0;
  }
`;

export default NovelViewerPage;
