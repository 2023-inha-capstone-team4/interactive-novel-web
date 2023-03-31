import { useState } from 'react';
import styled from '@emotion/styled';
import { Collapse, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SearchBar from './SearchBar';
import NavBar from './NavBar';

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
        <span>LOGO</span>
        <span>
          <IconButton onClick={() => console.log('Person Button clicked')}>
            <PersonIcon />
          </IconButton>
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
