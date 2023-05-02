/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { ViewerTool, ViewerToolBox } from './ViewerToolBox';

function NovelViewerPage() {
  const { id } = useParams();

  return (
    <div css={style}>
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
  .viewtoolbox-container {
    position: fixed;
    top: 15px;
    right: 10px;
  }
`;

export default NovelViewerPage;
