/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ReactNode, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

/**
 * 뷰어의 기능 버튼들을 모아두기 위한 컨테이너 컴포넌트입니다.
 * 토글을 통해 버튼들을 표시하거나 숨길 수 있습니다.
 */
export function ViewerToolBox(props: ViewerToolBoxProps) {
  const [open, setOpen] = useState(false);

  const handleToggleClick = () => {
    setOpen(!open);
  };

  return (
    <div css={viewerToolBoxStyle}>
      <div className="viewertoolbox-toggle" onClick={handleToggleClick}>
        {open ? <UnfoldLessIcon /> : <MenuIcon />}
      </div>
      {open && <div className="viewertoolbox-tools">{props.children}</div>}
    </div>
  );
}

interface ViewerToolBoxProps {
  children?: ReactNode;
}

const viewerToolBoxStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;

  .viewertoolbox-toggle {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 42px;
    height: 42px;
    margin-bottom: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
  }

  .viewertoolbox-tools {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;

    & > * {
      margin: 3px 0;
    }
  }
`;

/**
 * ViewToolBox 컴포넌트 내에서 사용하기 위한 기능 버튼 컴포넌트입니다.
 */
export function ViewerTool(props: ViewerToolProps) {
  return <div css={viewerToolStyle}>{props.children}</div>;
}

interface ViewerToolProps {
  children?: ReactNode;
  onClick?: () => void;
}

const viewerToolStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 8px 10px;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;

  cursor: pointer;
`;
