import { useState } from 'react';
import styled from '@emotion/styled';
import { Collapse, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MyAccountButton from '../MyAccountButton';

/**
 * 페이지의 Header 요소입니다.
 */
function Header() {
  const [searchBarDisplayed, displaySearchBar] = useState(false);

  const toggleSearchBar = () => {
    displaySearchBar(!searchBarDisplayed);
  };

  return (
    <>
      <StyledHeader>
        <Link to="/" style={{ textDecoration: 'none', color: '#000000' }}>
          <span>LOGO</span>
        </Link>
        <span>
          <MyAccountButton />
          <IconButton onClick={toggleSearchBar}>
            <SearchIcon />
          </IconButton>
        </span>
      </StyledHeader>
      <Collapse in={searchBarDisplayed}>
        <SearchBar />
      </Collapse>
      <NavBar />
    </>
  );
}

/**
 * 헤더 영역 스타일입니다.
 */
const StyledHeader = styled.header`
  height: 60px;
  padding: 0 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
