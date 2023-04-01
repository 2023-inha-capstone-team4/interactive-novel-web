import styled from '@emotion/styled';

/**
 * 수평 스크롤 컴포넌트입니다.
 */
function HorizontalSlider(props: HorizontalSliderProps) {
  return <StyledHorizontalSlider>{props.children}</StyledHorizontalSlider>;
}

interface HorizontalSliderProps {
  children: React.ReactNode;
}

const StyledHorizontalSlider = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;

  /* 아이템 사이 여백 */
  & > * {
    margin: 0 15px;
  }

  /* 스크롤 바 숨기기 */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export default HorizontalSlider;
