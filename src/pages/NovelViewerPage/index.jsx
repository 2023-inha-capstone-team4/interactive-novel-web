/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { ViewerTool, ViewerToolBox } from './ViewerToolBox';
import { MasterManagerContext } from '../../libs/renderer/lib/MasterManagerContext';
import { MasterManager } from '../../libs/renderer/lib/MasterManager';
import MasterCanvas from '../../libs/renderer/component/MasterCanvas';
import { useEffect, useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import Reviews from './Reviews';

function NovelViewerPage() {
  const { id: idParam } = useParams();
  const id = parseInt(idParam);

  const [masterManager, setMasterManager] = useState(null);
  const [reviewDrawerOpen, setReviewDrawerOpen] = useState(false);

  const openReviewDrawer = () => setReviewDrawerOpen(true);
  const closeReviewDrawer = () => setReviewDrawerOpen(false);

  const setupMasterManager = () => {
    setMasterManager(new MasterManager());
  };

  useEffect(() => {
    // 1. 노벨 데이터 로드
    // 2. MasterManager 세팅
    setupMasterManager();
  }, []);

  if (!masterManager) {
    return <></>;
  }

  return (
    <div css={style}>
      <div className="canvas-container">
        <MasterManagerContext.Provider value={masterManager}>
          <MasterCanvas />
        </MasterManagerContext.Provider>
      </div>
      <SwipeableDrawer
        anchor="bottom"
        open={reviewDrawerOpen}
        onOpen={openReviewDrawer}
        onClose={closeReviewDrawer}
      >
        <Reviews novelId={id} />
      </SwipeableDrawer>
      <div className="viewtoolbox-container">
        <ViewerToolBox>
          <ViewerTool>좋아요</ViewerTool>
          <ViewerTool onClick={openReviewDrawer}>리뷰 (999)</ViewerTool>
          <ViewerTool>맨 위로</ViewerTool>
          <ViewerTool>그만 볼래요</ViewerTool>
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
    max-width: 700px;
    margin: 0 auto;

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

export default NovelViewerPage;
