/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { ViewerTool, ViewerToolBox } from './ViewerToolBox';
import { MasterManagerContext } from '../../libs/renderer/lib/MasterManagerContext';
import { MasterManager } from '../../libs/renderer/lib/MasterManager';
import MasterCanvas from '../../libs/renderer/component/MasterCanvas';
import { useEffect, useState } from 'react';

function NovelViewerPage() {
  const { id } = useParams();
  const [masterManager, setMasterManager] = useState(null);

  const setupMasterManager = () => {
    setMasterManager(new MasterManager());
  };

  useEffect(() => {
    // 1. 노벨 데이터 로드
    // 2. MasterManager 세팅
    setupMasterManager();
  }, []);

  if (!masterManager) {
    return <>로딩 중...</>;
  }

  return (
    <div css={style}>
      <div className="canvas-container">
        <MasterManagerContext.Provider value={masterManager}>
          <MasterCanvas />
        </MasterManagerContext.Provider>
      </div>
      <div className="viewtoolbox-container">
        <ViewerToolBox>
          <ViewerTool>좋아요</ViewerTool>
          <ViewerTool>리뷰 (999)</ViewerTool>
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
  .viewtoolbox-container {
    position: fixed;
    top: 15px;
    right: 10px;
  }
`;

export default NovelViewerPage;
