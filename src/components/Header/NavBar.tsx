import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { COLOR_PRIMARY } from '../../utils/constant';

/**
 * 네비게이션 바 요소입니다.
 */
function NavBar() {
  return (
    <StyledNav>
      <ul>
        <li>
          <StyledLink to="/">신규</StyledLink>
        </li>
        <li>
          <StyledLink to="/">인기</StyledLink>
        </li>
        <li>
          <StyledLink to="/">카테고리</StyledLink>
        </li>
      </ul>
      <StyledLink to="/bookmark" color={COLOR_PRIMARY}>
        북마크
      </StyledLink>
    </StyledNav>
  );
}

/**
 * 네비 바 영역 스타일입니다.
 */
const StyledNav = styled.nav`
  height: 50px;
  padding: 0 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid #cccccc;

  ul {
    padding-left: 0;
    list-style: none;

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    li {
      margin-right: 30px;
    }
  }
`;

/**
 * 링크 요소의 스타일입니다.
 */
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${(props) => props.color ?? '#000000'};
`;

export default NavBar;
